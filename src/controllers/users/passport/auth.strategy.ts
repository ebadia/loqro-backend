import * as passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users.service'

const token_secret = process.env.TOKEN_SECRET || 'mamamia'

@Injectable()
export class JwtAuthStrategy extends Strategy {
  constructor(private readonly usersService: UsersService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: token_secret
      },
      async (req, payload, next) => await this.verify(req, payload, next)
    )
    passport.use(this)
  }

  public async verify(req, payload, done) {
    const isValid = await this.usersService.validateUser(payload)
    if (!isValid) {
      return done(new UnauthorizedException(), false)
    }
    done(null, payload)
  }
}
