import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDefined,
  IsEnum,
  IsNumber
} from 'class-validator'

import { Producto } from '@entities/Producto.entity'

export class UpdateEventoDto {
  readonly fecha: string
  readonly hora: string
  readonly evento: string
  readonly producto?: Producto
}
