import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ClientesController } from './clientes.controller'
import { ClientesService } from './clientes.service'
import { Cliente } from '@entities/Cliente.entity'

@Module({
  controllers: [ClientesController],
  imports: [TypeOrmModule.forFeature([Cliente])],
  providers: [ClientesService],
  exports: [ClientesService]
})
export class ClientesModule {}
