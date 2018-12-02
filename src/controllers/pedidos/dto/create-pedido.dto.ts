import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDefined,
  IsEnum,
  IsNumber
} from 'class-validator'
import { Producto } from '@entities/Producto.entity'

export class CreatePedidoDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsNotEmpty()
  @IsString()
  readonly phone: string

  @IsNotEmpty()
  @IsString()
  readonly email: string

  @IsNotEmpty()
  @IsString()
  readonly line1: string

  @IsNotEmpty()
  @IsString()
  readonly line2: string

  @IsNotEmpty()
  @IsString()
  readonly city: string

  @IsNotEmpty()
  @IsString()
  readonly postal_code: string

  @IsNotEmpty()
  @IsString()
  readonly state: string

  @IsOptional() readonly productos: Producto
}
