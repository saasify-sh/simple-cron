import { URL } from 'url'
import * as scheduler from '@google-cloud/scheduler'
import * as types from './types'

import Scheduler = scheduler.protos.google.cloud.scheduler.v1

const projectId = process.env.GOOGLE_PROJECT_ID
const projectLocation = process.env.GOOGLE_PROJECT_LOCATION

const client = new scheduler.CloudSchedulerClient()
const parent = client.locationPath(projectId, projectLocation)

export async function createJob(job: types.CronJob): Promise<Scheduler.IJob> {
  const jobResult = await client.createJob({
    parent,
    job: cronJobToSchedulerJob(job)
  })

  return jobResult[0]
}

export async function getJob(job: types.CronJob): Promise<Scheduler.IJob> {
  const name = getSchedulerJobName(job)

  const jobResult = await client.getJob({
    name
  })

  return jobResult[0]
}

export async function updateJob(job: types.CronJob): Promise<Scheduler.IJob> {
  const jobResult = await client.updateJob({
    job: cronJobToSchedulerJob(job)
  })

  return jobResult[0]
}

function getSchedulerJobName(job: types.CronJob): string {
  return `${parent}/jobs/${job.id}`
}

function cronJobToSchedulerJob(job: types.CronJob): Scheduler.IJob {
  const name = getSchedulerJobName(job)

  const url = new URL(job.url)
  if (job.httpQuery) {
    for (const key of Object.keys(job.httpQuery)) {
      url.searchParams.set(key, job.httpQuery[key])
    }
  }

  let state: Scheduler.Job.State = Scheduler.Job.State.STATE_UNSPECIFIED

  switch (job.state) {
    case 'enabled':
      state = Scheduler.Job.State.ENABLED
      break
    case 'disabled':
      state = Scheduler.Job.State.DISABLED
      break
    case 'paused':
      state = Scheduler.Job.State.PAUSED
      break
  }

  const schedulerJob = {
    name,
    description: job.description,
    schedule: job.schedule,
    timeZone: job.timezone,
    state,
    httpTarget: {
      uri: url.toString(),
      httpMethod: job.httpMethod,
      headers: job.httpHeaders,
      body: job.httpBody ? Buffer.from(JSON.stringify(job.httpBody)) : undefined
    }
  }

  console.log({ schedulerJob })
  return schedulerJob
}
