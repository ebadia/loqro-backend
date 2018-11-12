import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductosController } from './productos.controller'
import { ProductosService } from './productos.service'
import { Producto } from '@entities/Producto.entity'

@Module({
  controllers: [ProductosController],
  imports: [TypeOrmModule.forFeature([Producto])],
  providers: [ProductosService],
  exports: [ProductosService]
})
export class ProductosModule {}
