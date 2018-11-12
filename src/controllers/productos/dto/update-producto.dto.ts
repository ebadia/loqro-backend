import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDefined,
  IsEnum,
  IsNumber
} from 'class-validator'
import { Cliente } from '@entities/Cliente.entity'
import { Evento } from '@entities/Evento.entity'

export class UpdateProductoDto {
  readonly nombre: string
  readonly descripcion: string
  readonly imagen: string
  readonly precio: number
  readonly oferta: number
  readonly cliente?: Cliente
  readonly eventos?: Evento[]
}
