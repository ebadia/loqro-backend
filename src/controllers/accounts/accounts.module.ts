import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
// import * as passport from 'passport'
// import { JwtAuthStrategy } from './passport/auth.strategy'
import { JwtAuthStrategy } from './passport/jwt.strategy'

import { AccountsController } from './accounts.controller'
import { AccountsService } from './accounts.service'
import { Account } from '../../entities/Account.entity'

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, JwtAuthStrategy],
  imports: [TypeOrmModule.forFeature([Account])]
})
export class AccountsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}
