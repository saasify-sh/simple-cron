import { IncomingWebhook } from '@slack/webhook'
import { formatDate } from '../format-date'
import * as types from '../types'

// TODO: look into slack block formatting
// https://api.slack.com/tools/block-kit-builder?mode=message&blocks=%5B%7B%22type%22%3A%22section%22%2C%22text%22%3A%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22You%20have%20a%20new%20request%3A%5Cn*%3CfakeLink.toEmployeeProfile.com%7CFred%20Enriquez%20-%20New%20device%20request%3E*%22%7D%7D%2C%7B%22type%22%3A%22section%22%2C%22fields%22%3A%5B%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22*Type%3A*%5CnComputer%20(laptop)%22%7D%2C%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22*When%3A*%5CnSubmitted%20Aut%2010%22%7D%2C%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22*Last%20Update%3A*%5CnMar%2010%2C%202015%20(3%20years%2C%205%20months)%22%7D%2C%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22*Reason%3A*%5CnAll%20vowel%20keys%20aren%27t%20working.%22%7D%2C%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22*Specs%3A*%5Cn%5C%22Cheetah%20Pro%2015%5C%22%20-%20Fast%2C%20really%20fast%5C%22%22%7D%5D%7D%2C%7B%22type%22%3A%22actions%22%2C%22elements%22%3A%5B%7B%22type%22%3A%22button%22%2C%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22emoji%22%3Atrue%2C%22text%22%3A%22Approve%22%7D%2C%22style%22%3A%22primary%22%2C%22value%22%3A%22click_me_123%22%7D%2C%7B%22type%22%3A%22button%22%2C%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22emoji%22%3Atrue%2C%22text%22%3A%22Deny%22%7D%2C%22style%22%3A%22danger%22%2C%22value%22%3A%22click_me_123%22%7D%5D%7D%5D

const iconEmojiLabels = {
  open: ':warning:',
  closed: ':white_check_mark:'
}

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
  if (!job.slackWebhookUrl) {
    return
  }

  const text = `
${emojiLabel}*Simple Cron Job Failure ${stateLabel}*

Job Name: *${job.name}*
Job ID: \`${job.id}\`

HTTP status: *${job.status?.code}*
HTTP message: *${job.status?.message}*
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

https://simplecron.dev/dashboard
`

  return send({
    text,
    webhookUrl: job.slackWebhookUrl,
    icon_emoji: iconEmojiLabels[incident.state]
  })
}

export async function send({ text, webhookUrl, ...rest }) {
  const webhook = new IncomingWebhook(webhookUrl)

  return webhook.send({
    unfurl_links: false,
    text,
    ...rest
  })
}
