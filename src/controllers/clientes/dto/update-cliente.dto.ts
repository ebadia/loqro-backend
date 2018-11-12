import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDefined,
  IsEnum,
  IsNumber
} from 'class-validator'

import { Producto } from '@entities/Producto.entity'

export class UpdateClienteDto {
  readonly nombre: string
  readonly descripcion: string
  readonly imagen: string
  readonly producto?: Producto[]
}
