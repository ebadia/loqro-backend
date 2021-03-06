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

import { Cliente } from './Cliente.entity'
import { Evento } from './Evento.entity'
import { Pedido } from './Pedido.entity'

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

  @Column('real', {
    nullable: false,
    default: 0
  })
  precio: number

  @Column('real', {
    nullable: false,
    default: 0
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

  @OneToMany(type => Pedido, pedido => pedido.producto)
  pedidos: Pedido[]

  @ManyToOne(type => Cliente, cliente => cliente.productos)
  cliente: Cliente

  @OneToMany(type => Evento, evento => evento.producto)
  eventos: Evento[]
}
