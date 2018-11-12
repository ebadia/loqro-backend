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

export class WelcomeMailDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly first_name: string

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly password: string

  @IsEmail()
  @ApiModelProperty()
  @IsNotEmpty()
  readonly to: string
}
