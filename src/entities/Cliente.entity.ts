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

import { Producto } from './Producto.entity'
import { User } from './User.entity'

@Entity()
export class Cliente {
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

  // relaciones

  @OneToMany(type => Producto, producto => producto.cliente)
  productos: Producto[]

  @OneToMany(type => User, user => user.cliente)
  users: User[]
}
