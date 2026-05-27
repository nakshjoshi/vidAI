import { Request, Response, NextFunction } from 'express'
import { logger } from '../lib/logger'

/**
 * Logs every incoming HTTP request with method, url, status, and duration.
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now()
  res.on('finish', () => {
    logger.info(
      {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        durationMs: Date.now() - start,
      },
      `${req.method} ${req.originalUrl} ${res.statusCode}`
    )
  })
  next()
}
