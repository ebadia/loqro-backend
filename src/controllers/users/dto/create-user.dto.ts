import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDefined,
  IsEnum
} from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string

  @IsNotEmpty()
  @IsString()
  readonly lastName: string

  @IsOptional()
  @IsString()
  readonly mobile: string

  @IsOptional()
  @IsString()
  readonly phone: string

  @IsOptional()
  @IsString()
  readonly address: string

  @IsOptional()
  @IsString()
  readonly city: string

  @IsOptional()
  @IsString()
  readonly province: string

  @IsOptional()
  @IsString()
  readonly cp: string

  @IsOptional()
  @IsString()
  readonly sex: string

  @IsString()
  @IsOptional()
  readonly email: string

  @IsString()
  @IsOptional()
  readonly username: string

  @IsString()
  @IsOptional()
  readonly password: string
}
