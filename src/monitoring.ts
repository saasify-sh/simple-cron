import grpc = require('grpc')
import * as monitoring from '@google-cloud/monitoring'
import * as monitoringTypes from '@google-cloud/monitoring/protos/protos'
import * as types from './types'

const alertClient = new monitoring.AlertPolicyServiceClient({
  grpc: grpc as any
})

// const notificationClient = new monitoring.NotificationChannelServiceClient({
//   grpc: grpc as any
// })

const metricName = 'logging.googleapis.com/user/simple-cron-job-errors'
const notificationChannelName =
  'projects/saasify/notificationChannels/6071543916583820227'

export async function createAlert(
  job: types.CronJob
): Promise<monitoringTypes.google.monitoring.v3.AlertPolicy> {
  const projectId = await alertClient.getProjectId()
  const projectPath = alertClient.projectPath(projectId)

  const filter = `
    metric.type = "${metricName}" AND 
    metric.labels.job_id = "${job.id}" AND
    resource.type="cloud_scheduler_job"
  `.replace(/[ \r\n]+/g, ' ')

  console.log({ filter })

  const alertPolicy = (
    await alertClient.createAlertPolicy({
      name: projectPath,
      alertPolicy: {
        displayName: `Cron job failure alert - ${job.name || job.id}`,
        notificationChannels: [notificationChannelName],
        combiner: 'OR',
        conditions: [
          {
            displayName: `Cron job failure condition - ${job.name || job.id}`,
            conditionThreshold: {
              filter,
              comparison: 'COMPARISON_GT',
              duration: {
                seconds: 120,
                nanos: 0
              },
              thresholdValue: 0
              // trigger: {
              //   count: 1
              // },
              // aggregations: [
              //   {
              //     alignmentPeriod: '60s',
              //     perSeriesAligner: 'ALIGN_RATE'
              //   }
              // ]
            }
          }
        ]
      }
    })
  )[0]

  return alertPolicy
}

export async function deleteAlert(job: types.CronJob): Promise<void> {
  if (!job.alertPolicy) {
    return
  }

  await alertClient.deleteAlertPolicy({
    name: job.alertPolicy
  })
}
