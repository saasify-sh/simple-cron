import grpc = require('grpc')
import * as firestore from '@google-cloud/firestore'

import * as types from './types'

export const db = new firestore.Firestore({ grpc })
export const CronJobs = db.collection('cron-jobs')

export async function get<T extends types.Model>(
  doc: firestore.DocumentReference,
  userId?: string
): Promise<T> {
  const snapshot = await doc.get()

  if (snapshot.exists) {
    const res = getSnapshot<T>(snapshot)

    if (userId && res.userId && res.userId !== userId) {
      throw {
        message: 'Unauthorized',
        status: 403
      }
    }

    return res
  }

  throw {
    message: 'Not found',
    status: 404
  }
}

export function getSnapshot<T extends types.Model>(
  snapshot: firestore.DocumentSnapshot<firestore.DocumentData>
): T {
  const data = snapshot.data()

  return {
    ...data,
    id: snapshot.id,
    createdAt: snapshot.createTime.toDate(),
    updatedAt: snapshot.updateTime.toDate()
  } as T
}

export async function getUserJobDocs({
  userId,
  offset = 0,
  limit = null,
  orderBy = null
}) {
  let query = CronJobs.where('userId', '==', userId)

  if (offset) {
    query = query.offset(offset)
  }

  if (limit) {
    query = query.limit(limit)
  }

  if (orderBy) {
    query = query.orderBy(orderBy.key, orderBy.direction)
  }

  return query.get()
}
