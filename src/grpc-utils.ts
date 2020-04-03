import * as types from './types'

export function convertCode(code?: number | null): types.HttpStatus | null {
  if (code !== null) {
    switch (code) {
      case 0:
        return {
          code: 200,
          message: 'OK'
        }
      case 1:
        return {
          code: 499,
          message: 'Cancelled'
        }
      case 2:
        return {
          code: 500,
          message: 'Internal Server Error - Unknown'
        }
      case 3:
        return {
          code: 400,
          message: 'Bad Request'
        }
      case 4:
        return {
          code: 504,
          message: 'Gateway Timeout'
        }
      case 5:
        return {
          code: 404,
          message: 'Not Found'
        }
      case 6:
        return {
          code: 409,
          message: 'Conflict'
        }
      case 7:
        return {
          code: 403,
          message: 'Forbidden'
        }
      case 8:
        return {
          code: 429,
          message: 'Too Many Requests'
        }
      case 9:
        return {
          code: 400,
          message: 'Bad Request'
        }
      case 10:
        return {
          code: 409,
          message: 'Aborted'
        }
      case 11:
        return {
          code: 400,
          message: 'Bad Request - Out Of Range'
        }
      case 12:
        return {
          code: 501,
          message: 'Not Implemented'
        }
      case 13:
        return {
          code: 500,
          message: 'Internal Server Error'
        }
      case 14:
        return {
          code: 503,
          message: 'Service Unavailable'
        }
      case 15:
        return {
          code: 500,
          message: 'Internal Server Error - Data Loss'
        }
    }
  }

  return null
}
