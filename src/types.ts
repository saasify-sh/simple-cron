export interface HttpBody {
  [key: string]: any
}

export interface HttpQuery {
  [key: string]: string
}

export interface HttpHeaders {
  [key: string]: string
}

export interface LogEntry {
  [key: string]: any
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

export interface Model {
  id: string
  userId: string

  createdAt: Date
  updatedAt: Date
}

export interface HttpStatus {
  code: number
  message: string
}

export interface CronJob extends Model {
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

  lastAttemptTime?: Date
  nextAttemptTime?: Date

  status?: HttpStatus

  // numRunsSuccess: number
  // numRunsFailure: number

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

export interface LogOptions {
  limit?: number
}
