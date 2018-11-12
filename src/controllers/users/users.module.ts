import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtAuthStrategy } from './passport/jwt.strategy'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from '../../entities/User.entity'

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtAuthStrategy],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService]
})
export class UsersModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // consumer
  }
}
