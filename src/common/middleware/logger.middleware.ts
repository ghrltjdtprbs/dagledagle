//  src/common/middleware/logger.middleware.ts

import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      const message = `${method} ${originalUrl} ${statusCode}`;
      this.logger.log(message);
    });

    next();
  }
}
