import type { NextFunction, Request, Response } from "express"

// Accepts any typed async handler — broader than RequestHandler to support
// Request<P, ResBody, ReqBody> generic variants in controllers
type AnyAsyncHandler = (
  req: Request<any, any, any, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
  res: Response,
  next: NextFunction
) => Promise<void>

const asyncHandler =
  (fn: AnyAsyncHandler) =>
  (req: Request, res: Response, next: NextFunction): void => {
    void fn(req, res, next).catch((err: unknown) => next(err))
  }

export { asyncHandler }
