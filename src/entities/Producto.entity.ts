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

import { Cliente } from './Cliente.entity'
import { Evento } from './Evento.entity'

@Entity()
export class Producto {
  @PrimaryGeneratedColumn() id: number
  @CreateDateColumn({
    select: false
  })
  createdAt: Date
  @UpdateDateColumn({
    select: false
  })
  updatedAt: Date

  @Column('character varying', {
    nullable: true,
    unique: true,
    length: 255
  })
  nombre: string

  @Column('character varying', {
    nullable: true
  })
  descripcion: string

  @Column('character varying', {
    nullable: true
  })
  imagen: string

  @Column('float', {
    nullable: true
  })
  precio: number

  @Column('float', {
    nullable: true
  })
  oferta: number

  @Column('character varying', {
    nullable: true
  })
  desde: string

  @Column('character varying', {
    nullable: true
  })
  hasta: string

  // @Column('boolean', {
  //   nullable: true
  // })
  // activo: boolean

  // relaciones

  @ManyToOne(type => Cliente, cliente => cliente.productos)
  cliente: Cliente

  @OneToMany(type => Evento, evento => evento.producto)
  eventos: Evento[]
}
