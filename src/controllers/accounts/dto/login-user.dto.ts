import {
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsNumber,
  IsEmail,
  IsOptional,
  IsNotEmpty
} from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  @ApiModelProperty()
  readonly password: string

  @IsEmail()
  @ApiModelProperty()
  @IsNotEmpty()
  readonly email: string

  @IsEmail()
  @ApiModelProperty()
  @IsOptional()
  readonly type: string
}
