import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { ApiError } from '../utils'
import { logger } from '../lib/logger'

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Structured ApiError — thrown intentionally from services/controllers
  if (err instanceof ApiError) {
    logger.warn({ statusCode: err.statusCode, message: err.message }, 'ApiError')
    res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
      data: null,
    })
    return
  }

  // Zod validation error — thrown by validate middleware
  if (err instanceof ZodError) {
    logger.warn({ issues: err.issues }, 'Validation error')
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Validation failed',
      errors: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
      data: null,
    })
    return
  }

  // Unknown / unhandled error
  logger.error(err, 'Unhandled error')
  res.status(500).json({
    success: false,
    statusCode: 500,
    message: 'Internal Server Error',
    errors: [],
    data: null,
  })
}
