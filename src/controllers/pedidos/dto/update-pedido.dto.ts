import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDefined,
  IsEnum,
  IsNumber
} from 'class-validator'
import { Producto } from '@entities/Producto.entity'

export class UpdatePedidoDto {
  readonly name: string
  readonly phone: string
  readonly email: string
  readonly line1: string
  readonly line2: string
  readonly city: string
  readonly postal_code: string
  readonly state: string
  readonly producto: Producto
}
