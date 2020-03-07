import { Body, Controller, Get, Post, Put, Route, Header } from 'tsoa'

import { CronJob, CronJobCreateRequest, CronJobUpdateRequest } from './types'
import * as db from './db'
import * as utils from './utils'

@Route('/jobs')
export class CronJobController extends Controller {
  @Post()
  public async createJob(
    @Body() body: CronJobCreateRequest,
    @Header('x-saasify-user') userId: string
  ): Promise<CronJob> {
    console.log('createJob', { body, userId })

    const doc = await db.CronJobs.add({
      ...body,
      userId
    })

    return utils.docToCronJob(doc, userId)
  }

  @Get(`/{jobId}`)
  public async getJob(
    jobId: string,
    @Header('x-saasify-user') userId: string
  ): Promise<CronJob> {
    console.log('getJob', { jobId, userId })

    const doc = await db.CronJobs.doc(jobId)
    return utils.docToCronJob(doc, userId)
  }

  @Put(`/{jobId}`)
  public async updateJob(
    jobId: string,
    @Body() body: CronJobUpdateRequest,
    @Header('x-saasify-user') userId: string
  ): Promise<CronJob> {
    console.log('updateJob', { jobId, body, userId })

    const doc = await db.CronJobs.doc(jobId)
    const snapshot = await doc.get()
    if (snapshot.exists) {
      const data = snapshot.data()

      if (data.userId === userId) {
        await doc.set(body)
        return utils.docToCronJob(doc, userId)
      }
    }

    throw {
      message: 'Not found',
      status: 404
    }
  }
}
