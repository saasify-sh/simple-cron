import mailgun = require('mailgun-js')
import pify = require('pify')
import unified = require('unified')
import markdown = require('remark-parse')
import html = require('remark-html')

import { formatDate } from '../format-date'
import * as types from '../types'

// TODO: add better formatting via a handlebars html template

const apiKey = process.env.MAILGUN_API_KEY
const domain = process.env.MAILGUN_DOMAIN

const client =
  apiKey && domain
    ? mailgun({
        apiKey,
        domain
      })
    : null

export async function sendNotification({
  job,
  incident,
  stateLabel,
  emojiLabel
}: {
  job: types.CronJob
  incident: any
  stateLabel: string
  emojiLabel: string
}) {
  if (!job.email) {
    return
  }

  const subject = `Simple Cron Job Alert - ${job.name}`

  const message = `
${emojiLabel}**Simple Cron Job Failure ${stateLabel}**


Job Name: **${job.name}**

Job ID: \`${job.id}\`


HTTP status: **${job.status?.code}**

HTTP message: **${job.status?.message}**

Last attempt time: ${formatDate(job.lastAttemptTime)}

Next attempt time: ${formatDate(job.nextAttemptTime)}


Incident start time: ${
    incident.started_at
      ? formatDate(new Date(incident.started_at * 1000))
      : 'n/a'
  }

Incident end time: ${
    incident.ended_at ? formatDate(new Date(incident.ended_at * 1000)) : 'n/a'
  }


[View Job](https://simplecron.dev/dashboard)
`

  // convert markdown to html
  const body = (
    await unified().use(markdown).use(html).process(message)
  ).toString()

  return send({ html: body, subject, to: job.email })
}

export async function send({
  from = 'Simple Cron <support@saasify.sh>',
  subject,
  html,
  to
}) {
  if (!client) {
    console.warn(
      'Warning: email is disabled. Please specify MAILGUN_API_KEY and MAILGUN_DOMAIN to enable email notifications.'
    )
    return
  }

  const messages = client.messages()
  const send = pify(messages.send.bind(messages))

  return send({
    html,
    subject,
    from,
    to
  })
}
