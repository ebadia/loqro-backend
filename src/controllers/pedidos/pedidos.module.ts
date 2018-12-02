import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PedidosController } from './pedidos.controller'
import { PedidosService } from './pedidos.service'
import { Pedido } from '@entities/Pedido.entity'

@Module({
  controllers: [PedidosController],
  imports: [TypeOrmModule.forFeature([Pedido])],
  providers: [PedidosService],
  exports: [PedidosService]
})
export class PedidosModule {}
