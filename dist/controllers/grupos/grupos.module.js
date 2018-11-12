"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const passport = require("passport");
const cors_1 = require("@nest-middlewares/cors");
const grupos_controller_1 = require("./grupos.controller");
const grupos_service_1 = require("./grupos.service");
const Grupo_entity_1 = require("../../entities/Grupo.entity");
let GruposModule = class GruposModule {
    configure(consumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(grupos_controller_1.GruposController)
            .apply(cors_1.CorsMiddleware)
            .forRoutes(grupos_controller_1.GruposController);
    }
};
GruposModule = __decorate([
    common_1.Module({
        controllers: [grupos_controller_1.GruposController],
        providers: [grupos_service_1.GruposService],
        imports: [typeorm_1.TypeOrmModule.forFeature([Grupo_entity_1.Grupo])],
    })
], GruposModule);
exports.GruposModule = GruposModule;
//# sourceMappingURL=grupos.module.js.map