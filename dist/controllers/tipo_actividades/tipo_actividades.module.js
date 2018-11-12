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
const tipo_actividades_controller_1 = require("./tipo_actividades.controller");
const tipo_actividades_service_1 = require("./tipo_actividades.service");
const TipoActividad_entity_1 = require("../../entities/TipoActividad.entity");
let TipoActividadesModule = class TipoActividadesModule {
    configure(consumer) {
        consumer.apply(cors_1.CorsMiddleware).forRoutes(tipo_actividades_controller_1.TipoActividadesController);
    }
};
TipoActividadesModule = __decorate([
    common_1.Module({
        controllers: [tipo_actividades_controller_1.TipoActividadesController],
        providers: [tipo_actividades_service_1.TipoActividadesService],
        imports: [typeorm_1.TypeOrmModule.forFeature([TipoActividad_entity_1.TipoActividad])]
    })
], TipoActividadesModule);
exports.TipoActividadesModule = TipoActividadesModule;
//# sourceMappingURL=tipo_actividades.module.js.map