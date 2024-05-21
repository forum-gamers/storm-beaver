import { Injectable, type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { json } from 'body-parser';

@Injectable()
export class BodyJsonParser implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction) {
    json()(req, res, next);
  }
}
