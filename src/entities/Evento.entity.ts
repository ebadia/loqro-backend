import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  QueryFailedError,
  AfterLoad
} from 'typeorm'
import {
  MinLength,
  MaxLength,
  IsEnum,
  IsNotEmpty,
  Validator,
  IsEmail
} from 'class-validator'
import { TipoEvento } from '@common/enums/tipo-evento.enum'
import { Producto } from './Producto.entity'

@Entity()
export class Evento {
  @PrimaryGeneratedColumn() id: number
  @CreateDateColumn({
    select: false
  })
  createdAt: Date
  @UpdateDateColumn({
    select: false
  })
  updatedAt: Date

  @Column('date', {
    nullable: true
  })
  fecha: string

  @Column('time', {
    nullable: true
  })
  hora: string

  @Column('enum', {
    nullable: true,
    enum: TipoEvento
  })
  @IsEnum(TipoEvento)
  evento: string

  // relaciones

  @ManyToOne(type => Producto, producto => producto.eventos)
  producto: Producto
}
