import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from '@nestjs/common'
import { CorsMiddleware } from '@nest-middlewares/cors'

import { MailsController } from './mails.controller'
import { MailsService } from './mails.service'

@Module({
  controllers: [MailsController],
  providers: [MailsService],
  exports: [MailsService]
})
export class MailsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes(MailsController)
  }
}
