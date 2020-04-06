import * as Koa from 'koa'

import * as db from './db'
import * as scheduler from './scheduler'
import * as types from './types'

import * as slack from './notification-channels/slack'
import * as email from './notification-channels/email'

const stateLabels = {
  open: 'Alert',
  closed: 'Resolved'
}

const emojiLabels = {
  open: '⚠️',
  closed: '✅'
}

export const handler = async (ctx: Koa.Context) => {
  const body = (ctx.request as any)?.body
  console.log('notification', body)

  const incident = body?.incident
  if (!incident) {
    ctx.throw(400, 'no incident')
  }

  const jobId = incident?.resource?.labels?.job_id
  if (!jobId) {
    ctx.throw(400, 'no job_id')
  }

  const state = incident.state
  const doc = db.CronJobs.doc(jobId)
  let job = await db.get<types.CronJob>(doc)
  console.log({ job })

  if (job.state !== 'enabled') {
    console.log(`job state is ${job.state} - ignoring notification alert`)
    ctx.body = `ignored (${job.state})`
    return
  }

  const schedulerJob = await scheduler.getJob(job)
  console.log({ schedulerJob })

  job = scheduler.enrichJob(job, schedulerJob)
  console.log('enriched', { job })

  // useful for testing
  // const state = 'open'
  // const job: types.CronJob = {
  //   name: 'test',
  //   id: 'foo',
  //   lastAttemptTime: new Date(),
  //   nextAttemptTime: new Date(),
  //   slackWebhookUrl: 'TODO',
  //   email: 'travis@saasify.sh',
  //   status: {
  //     code: 500,
  //     message: 'Internal Kitty Error'
  //   },
  //   state: 'enabled'
  // } as any
  // const incident = {}

  const stateLabel = stateLabels[state] || state
  const emojiLabel = emojiLabels[state] ? emojiLabels[state] + ' ' : ''

  await Promise.all([
    slack.sendNotification({ job, incident, stateLabel, emojiLabel }),
    email.sendNotification({ job, incident, stateLabel, emojiLabel })
  ])

  ctx.body = 'ok'
}
