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
import { Producto } from './Producto.entity'

@Entity()
export class Pedido {
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
    length: 255
  })
  name: string

  @Column('character varying', {
    nullable: true
  })
  phone: string

  @Column('character varying', {
    nullable: true
  })
  email: string

  @Column('character varying', {
    nullable: true
  })
  line1: string

  @Column('character varying', {
    nullable: true
  })
  line2: string

  @Column('character varying', {
    nullable: true
  })
  city: string

  @Column('character varying', {
    nullable: true
  })
  postal_code: string

  @Column('character varying', {
    nullable: true
  })
  state: string

  // @Column('boolean', {
  //   nullable: true
  // })
  // activo: boolean

  // relaciones

  @ManyToOne(type => Producto, producto => producto.pedidos)
  producto: Producto
}
