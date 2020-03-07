import { Firestore } from '@google-cloud/firestore'

export const db = new Firestore()
export const CronJobs = db.collection('cron-jobs')
export const CronJobRuns = db.collection('cron-job-runs')

// export async function addUser() {
//   const doc = await users.add({
//     first: 'Nala',
//     last: 'Fischer',
//     born: 2011
//   })
//   const snap = await doc.get()
//   return snap.data()
// }
