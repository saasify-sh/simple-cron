export interface HttpBody {
  [key: string]: any
}

export interface HttpQuery {
  [key: string]: string
}

export interface HttpHeaders {
  [key: string]: string
}

export type CronJobState = 'enabled' | 'disabled' | 'paused'
export type CronJobRunStatus = 'pending' | 'success' | 'failure'
export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS'

export interface CronJobCreateRequest {
  schedule: string
  timezone?: string

  url: string
  httpMethod?: HttpMethod
  httpHeaders?: HttpHeaders
  httpBody?: HttpBody
  httpQuery?: HttpQuery

  // metadata
  name?: string
  description?: string
  tags?: string[]
}

export interface CronJobUpdateRequest {
  state: CronJobState
}

export interface CronJob {
  id: string
  userId: string

  schedule: string
  timezone: string

  url: string
  httpMethod: HttpMethod
  httpHeaders: HttpHeaders
  httpBody: HttpBody
  httpQuery: HttpQuery

  // metadata
  name: string
  description: string
  tags: string[]

  state: CronJobState
  // numRunsSuccess: number
  // numRunsFailure: number

  createdAt: Date
  updatedAt: Date

  // TODO
  // slack stuff
  // email stuff
  // webhook stuff
}

// export interface CronJobRun {
//   id: string
//   cronJob: string
//   status: CronJobRunStatus
//   httpStatus: number
// }
