import { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'
import { logger } from '../lib/logger'

/**
 * Express middleware that validates req.body against a Zod schema.
 * On failure, passes a ZodError to the next error handler.
 */
export function validate<T>(schema: ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (err) {
      if (err instanceof ZodError) {
        logger.warn({ path: req.path, issues: err.issues }, 'Request body validation failed')
        next(err)
      } else {
        next(err)
      }
    }
  }
}
