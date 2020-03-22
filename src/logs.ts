import { Logging, Entry } from '@google-cloud/logging'
import pick = require('lodash.pick')

import * as types from './types'

const client = new Logging()

export async function getJobLogs(
  job: types.CronJob,
  opts: types.LogOptions = {}
): Promise<types.LogEntry[]> {
  const filter = `resource.type="cloud_scheduler_job" AND resource.labels.job_id="${job.id}"`

  console.log({ filter })
  const [entries] = await client.getEntries({
    filter,
    pageSize: opts.limit || 25
  })
  console.log({ entries })

  console.log()
  console.log()
  console.log()
  console.log()

  for (const entry of entries) {
    console.log('metadata', entry.metadata)
    console.log('data', entry.data)
  }

  console.log()
  console.log()
  console.log()
  console.log()

  return entries.map((entry) => encodeLogEntry(entry, job))
}

function encodeLogEntry(entry: Entry, job: types.CronJob): types.LogEntry {
  const metadata = pick(entry.metadata, [
    'timestamp',
    'severity',
    'httpRequest',
    'timestamp'
  ])

  const data = pick(entry.data, ['url', 'status'])
  let status = {
    message: data.status,
    code: metadata.httpRequest ? metadata.httpRequest.status : undefined
  }

  if (!Object.keys(status).length) {
    status = null
  }

  return {
    jobId: job.id,
    userId: job.userId,
    ...metadata,
    ...data,
    status
  }
}
