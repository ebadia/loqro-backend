import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users.service'

const token_secret = process.env.TOKEN_SECRET || 'mamamia'

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: token_secret
    })
  }

  public async validate(payload, done) {
    const isValid = await this.usersService.validateUser(payload)
    if (!isValid) {
      return done(new UnauthorizedException(), false)
    }
    done(null, payload)
  }
}
