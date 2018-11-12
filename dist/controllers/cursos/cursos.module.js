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
const cors_1 = require("@nest-middlewares/cors");
const cursos_controller_1 = require("./cursos.controller");
const cursos_service_1 = require("./cursos.service");
const Curso_entity_1 = require("../../entities/Curso.entity");
let CursosModule = class CursosModule {
    configure(consumer) {
        consumer.apply(cors_1.CorsMiddleware).forRoutes(cursos_controller_1.CursosController);
    }
};
CursosModule = __decorate([
    common_1.Module({
        controllers: [cursos_controller_1.CursosController],
        providers: [cursos_service_1.CursosService],
        imports: [typeorm_1.TypeOrmModule.forFeature([Curso_entity_1.Curso])],
    })
], CursosModule);
exports.CursosModule = CursosModule;
//# sourceMappingURL=cursos.module.js.map