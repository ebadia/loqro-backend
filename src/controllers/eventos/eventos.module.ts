import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EventosController } from './Eventos.controller'
import { EventosService } from './Eventos.service'
import { Evento } from '@entities/Evento.entity'

@Module({
  controllers: [EventosController],
  imports: [TypeOrmModule.forFeature([Evento])],
  providers: [EventosService],
  exports: [EventosService]
})
export class EventosModule {}
