import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    console.log('pedido: ', new Date().toDateString())
    if(req.route) throw new NotFoundException("Página não encontrada 404")
    next();
  }
}
