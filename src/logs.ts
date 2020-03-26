import grpc = require('grpc')
import { Logging, Entry } from '@google-cloud/logging'
import pick = require('lodash.pick')

import * as types from './types'

const logEntryTypeAttemptFinished =
  'type.googleapis.com/google.cloud.scheduler.logging.AttemptFinished'
const logEntryTypeAttemptStarted =
  'type.googleapis.com/google.cloud.scheduler.logging.AttemptStarted'

const client = new Logging({ grpc: grpc as any })

export async function getJobLogs(
  job: types.CronJob,
  opts: types.LogOptions = {}
): Promise<types.LogEntry[]> {
  const filter = `resource.type="cloud_scheduler_job" AND resource.labels.job_id="${job.id}"`

  const [entries] = await client.getEntries({
    filter,
    pageSize: opts.limit || 25
  })

  return entries.map((entry) => encodeLogEntry(entry, job))
}

function encodeLogEntry(entry: Entry, job: types.CronJob): types.LogEntry {
  const metadata = pick(entry.metadata, [
    'timestamp',
    'severity',
    'httpRequest'
  ])

  const { url, statusMessage } = entry.data
  const type = entry.data['@type']
  let status = null

  if (type == logEntryTypeAttemptFinished) {
    status = {
      message: statusMessage,
      code: metadata.httpRequest ? metadata.httpRequest.status : undefined
    }

    if (!status.message && status.code === 200) {
      status.message = 'OK'
    }
  } else if (type == logEntryTypeAttemptStarted) {
    status = {
      message: 'Attempt started'
    }
  }

  return {
    id: entry.metadata.insertId,
    jobId: job.id,
    userId: job.userId,
    httpMethod: job.httpMethod,
    url,
    status,
    ...metadata
  }
}
