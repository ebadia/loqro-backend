import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  QueryFailedError,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  AfterLoad
} from 'typeorm'
import {
  IsEmail,
  IsNotEmpty,
  Validator,
  MinLength,
  MaxLength
} from 'class-validator'
import * as bcrypt from 'bcrypt'

import { User } from './User.entity'

@Entity()
export class Account {
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
    nullable: false,
    unique: true,
    length: 255
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @Column('character varying', {
    nullable: false,
    length: 100,
    select: false
  })
  @MinLength(5)
  @MaxLength(100)
  @IsNotEmpty()
  password: string

  @Column('character varying', {
    nullable: true,
    unique: true,
    length: 255
  })
  username: string

  private tempPassword: string

  // password stuff
  @BeforeInsert()
  private async hashPassword() {
    this.password = await bcrypt.hash(this.password, Account.SALT_ROUNDS)
  }

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password
  }

  @BeforeUpdate()
  private async encryptPassword() {
    if (this.tempPassword !== this.password) {
      this.password = await bcrypt.hash(this.password, Account.SALT_ROUNDS)
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  private validateEmail() {
    const validator = new Validator()
    if (!validator.isEmail(this.email))
      throw new QueryFailedError('', [], 'email is not a valid email')
  }

  // Relations

  @OneToOne(type => User, user => user.account, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User
}
