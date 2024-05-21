import { Injectable, type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { urlencoded } from 'body-parser';

@Injectable()
export class UrlEncodedParser implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction) {
    urlencoded({ extended: true })(req, res, next);
  }
}
