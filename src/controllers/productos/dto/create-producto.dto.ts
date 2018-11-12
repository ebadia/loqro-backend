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

export class CreateProductoDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string

  @IsNotEmpty()
  @IsString()
  readonly descripcion: string

  @IsOptional()
  @IsString()
  readonly imagen: string

  @IsOptional()
  @IsNumber()
  readonly precio: number

  @IsOptional()
  @IsNumber()
  readonly oferta: number

  @IsOptional() readonly cliente: Cliente

  @IsOptional() readonly eventos: Evento[]
}
