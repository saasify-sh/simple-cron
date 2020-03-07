import { DocumentReference, Firestore } from '@google-cloud/firestore'
import * as types from './types'

export const db = new Firestore()
export const CronJobs = db.collection('cron-jobs')

export async function docToCronJob(
  doc: DocumentReference,
  userId: string
): Promise<types.CronJob> {
  const snapshot = await doc.get()

  if (snapshot.exists) {
    const data = snapshot.data()
    if (data.userId === userId) {
      return {
        ...data,
        createdAt: snapshot.createTime.toDate(),
        updatedAt: snapshot.updateTime.toDate()
      } as types.CronJob
    }
  }

  throw {
    message: 'Not found',
    status: 404
  }
}
