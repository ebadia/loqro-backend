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
import * as bcrypt from 'bcrypt'

import { UserType } from '../common/enums/user-type.enum'
import { Language } from '../common/enums/language.enum'
import { Cliente } from './Cliente.entity'
import { Account } from './Account.entity'

@Entity()
export class User {
  private static SALT_ROUNDS = 10

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
  firstName: string

  @Column('character varying', {
    nullable: true,
    length: 255
  })
  lastName: string

  @Column('character varying', {
    nullable: true,
    length: 12
  })
  mobile: string

  @Column('character varying', {
    nullable: true,
    length: 12
  })
  phone: string

  @Column('character varying', {
    nullable: true,
    length: 8
  })
  sex: string

  @Column('character varying', {
    nullable: true,
    length: 255
  })
  address: string

  @Column('character varying', {
    nullable: true,
    length: 255
  })
  city: string

  @Column('character varying', {
    nullable: true,
    length: 16
  })
  cp: string

  @Column('character varying', {
    nullable: true,
    length: 255
  })
  province: string

  @Column('character varying', {
    nullable: true
  })
  image: string

  @Column('enum', {
    nullable: true,
    default: 'ca',
    enum: Language
  })
  @IsEnum(Language)
  idioma: string

  @Column('enum', {
    nullable: true,
    default: 'User',
    enum: UserType
  })
  @IsEnum(Language)
  role: string

  // relaciones

  @ManyToOne(type => Cliente, cliente => cliente.users)
  cliente: Cliente

  @OneToOne(type => Account, account => account.user)
  account: Account
}
