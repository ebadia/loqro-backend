import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api/v1')
  // tslint:disable-next-line:radix
  await app.listen(parseInt(process.env.PORT) || 3500)
}
bootstrap()
