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
const compras_controller_1 = require("./compras.controller");
const compras_service_1 = require("./compras.service");
const Compra_entity_1 = require("../../entities/Compra.entity");
let ComprasModule = class ComprasModule {
    configure(consumer) {
        consumer.apply(cors_1.CorsMiddleware).forRoutes(compras_controller_1.ComprasController);
    }
};
ComprasModule = __decorate([
    common_1.Module({
        controllers: [compras_controller_1.ComprasController],
        providers: [compras_service_1.ComprasService],
        imports: [typeorm_1.TypeOrmModule.forFeature([Compra_entity_1.Compra])],
    })
], ComprasModule);
exports.ComprasModule = ComprasModule;
//# sourceMappingURL=compras.module.js.map