import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDefined,
  IsEnum,
  IsNumber
} from 'class-validator'

import { Producto } from '@entities/Producto.entity'

export class CreateClienteDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string

  @IsNotEmpty()
  @IsString()
  readonly descripcion: string

  @IsOptional()
  @IsString()
  readonly imagen: string

  @IsOptional() readonly productos: Producto[]
}
