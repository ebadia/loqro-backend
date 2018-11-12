"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const accounts_service_1 = require("../accounts.service");
const token_secret = process.env.TOKEN_SECRET || 'mamamia';
let JwtAuthStrategy = class JwtAuthStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor(accoutsService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: token_secret,
        });
        this.accoutsService = accoutsService;
    }
    validate(payload, done) {
        return __awaiter(this, void 0, void 0, function* () {
            const isValid = yield this.accoutsService.validateUser(payload);
            if (!isValid) {
                return done(new common_1.UnauthorizedException(), false);
            }
            done(null, payload);
        });
    }
};
JwtAuthStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService])
], JwtAuthStrategy);
exports.JwtAuthStrategy = JwtAuthStrategy;
//# sourceMappingURL=jwt.strategy.js.map