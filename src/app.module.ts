import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CorsMiddleware } from '@nest-middlewares/cors'
import { MailerModule } from '@nest-modules/mailer/dist'
// import { dbConfig } from '@common/db.config'
import { mailConfig } from '@common/mail.config'
import { AppController } from './app.controller'

import { AppService } from './app.service'
import { UsersModule } from '@controllers/users/users.module'
import { ProductosModule } from '@controllers/productos/productos.module'
import { ClientesModule } from '@controllers/clientes/clientes.module'

import * as dotenv from 'dotenv'
import { EventosModule } from '@controllers/eventos/eventos.module'
import { AccountsModule } from '@controllers/accounts/accounts.module'
dotenv.config()

const dbConfig: any = {
  url: process.env.DATABASE_URL,
  type: process.env.TYPEORM_CONNECTION,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  logging: process.env.TYPEORM_LOGGING,
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  cli: {
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    MailerModule.forRoot(mailConfig),
    AccountsModule,
    UsersModule,
    ProductosModule,
    ClientesModule,
    EventosModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(CorsMiddleware).forRoutes('*')
  }
}
