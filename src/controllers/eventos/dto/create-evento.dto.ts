import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDefined,
  IsEnum,
  IsNumber,
  IsDateString
} from 'class-validator'

import { Producto } from '@entities/Producto.entity'

export class CreateEventoDto {
  @IsNotEmpty()
  @IsString()
  readonly fecha: string

  @IsNotEmpty()
  @IsString()
  readonly hora: string

  @IsNotEmpty()
  @IsString()
  readonly evento: string

  @IsOptional()
  @IsString()
  readonly producto: Producto
}
