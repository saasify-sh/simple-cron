export interface HttpBody {
  [key: string]: any
}

export interface HttpQuery {
  [key: string]: string
}

export interface HttpHeaders {
  [key: string]: string
}

export type CronJobStatus = 'enabled' | 'disabled'
export type CronJobRunStatus = 'pending' | 'success' | 'failure'
export type HttpMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'trace'
  | 'patch'
  | 'head'
  | 'options'

export class CronJobCreateRequest {
  cronExpression: string
  url: string

  timezone: string = 'America/New_York'
  timeout: number = 0

  httpMethod: HttpMethod = 'get'
  httpHeaders: HttpHeaders = {}
  httpBody: HttpBody = {}
  httpQuery: HttpQuery = {}

  // metadata
  name: string = 'Default'
  description: string = ''
  tags: string[] = []
}

export interface CronJobUpdateRequest {
  status: CronJobStatus
}

export interface CronJob {
  id: string
  userId: string

  cronExpression: string
  timezone: string
  timeout: number

  url: string
  httpMethod: HttpMethod
  httpHeaders: HttpHeaders
  httpBody: HttpBody
  httpQuery: HttpQuery

  // metadata
  name: string
  description: string
  tags: string[]

  status: CronJobStatus
  numRunsSuccess: number
  numRunsFailure: number

  createdAt: Date
  updatedAt: Date

  // TODO
  // slack stuff
  // email stuff
  // webhook stuff
}

export interface CronJobRun {
  id: string
  cronJob: string
  status: CronJobRunStatus
  httpStatus: number
}
