import grpc = require('grpc')
import * as monitoring from '@google-cloud/monitoring'
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

export async function createAlert(job: types.CronJob): Promise<void> {
  if (!job.email) {
    return
  }

  const projectId = await alertClient.getProjectId()
  const projectPath = alertClient.projectPath(projectId)

  // const notificationChannel = (
  //   await notificationClient.createNotificationChannel({
  //     name: projectPath,
  //     notificationChannel: {
  //       type: 'webhook',
  //       labels: {
  //         email_address: job.email
  //       }
  //     }
  //   })
  // )[0]

  // console.log({ notificationChannel })
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

  console.log({ alertPolicy })
  return alertPolicy
}
