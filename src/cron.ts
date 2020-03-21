import { Body, Controller, Get, Post, Put, Query, Route, Header } from 'tsoa'
import { CronJob, CronJobCreateRequest, CronJobUpdateRequest } from './types'

import * as db from './db'
import * as scheduler from './scheduler'

@Route('/jobs')
export class CronJobController extends Controller {
  @Post()
  public async createJob(
    @Body() body: CronJobCreateRequest,
    @Header('x-saasify-user') userId: string
  ): Promise<CronJob> {
    console.log('createJob', { body, userId })

    const data = {
      timezone: 'America/New_York',
      httpMethod: 'GET',
      httpHeaders: {},
      name: 'Default',
      description: '',
      tags: [],
      ...body,
      userId
    }

    const doc = await db.CronJobs.add(data)
    const job = await db.get<CronJob>(doc, userId)
    console.log({ job })

    await scheduler.createJob(job)
    return job
  }

  @Get(`/{jobId}`)
  public async getJob(
    jobId: string,
    @Header('x-saasify-user') userId: string
  ): Promise<CronJob> {
    console.log('getJob', { jobId, userId })

    const doc = await db.CronJobs.doc(jobId)
    const job = await db.get<CronJob>(doc, userId)

    return job
  }

  @Get()
  public async listJobs(
    @Query() offset: number = 0,
    @Query() limit: number = 100,
    @Header('x-saasify-user') userId: string
  ): Promise<CronJob[]> {
    console.log('listJobs', { offset, limit, userId })

    const { docs } = await db.CronJobs.where('userId', '==', userId)
      .offset(offset)
      .limit(limit)
      .get()

    const jobs = docs.map((doc) => db.getSnapshot<CronJob>(doc))
    return jobs
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
        const job = await db.get<CronJob>(doc, userId)

        await scheduler.updateJob(job)
        return job
      }
    }

    throw {
      message: 'Not found',
      status: 404
    }
  }
}
