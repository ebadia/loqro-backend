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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const common_1 = require("@nestjs/common");
const tipo_actividades_service_1 = require("./tipo_actividades.service");
const TipoActividad_entity_1 = require("../../entities/TipoActividad.entity");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let TipoActividadesController = class TipoActividadesController {
    constructor(TipoActividadesService) {
        this.TipoActividadesService = TipoActividadesService;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.TipoActividadesService.findAll();
        });
    }
    finOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.TipoActividadesService.findOne(id);
        });
    }
    create(TipoActividad) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.TipoActividadesService.create(TipoActividad);
        });
    }
    update(id, TipoActividad) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.TipoActividadesService.update(id, TipoActividad);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.TipoActividadesService.delete(id);
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TipoActividadesController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TipoActividadesController.prototype, "finOne", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TipoActividad_entity_1.TipoActividad]),
    __metadata("design:returntype", Promise)
], TipoActividadesController.prototype, "create", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, TipoActividad_entity_1.TipoActividad]),
    __metadata("design:returntype", Promise)
], TipoActividadesController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TipoActividadesController.prototype, "delete", null);
TipoActividadesController = __decorate([
    swagger_1.ApiUseTags('Tipo Actividades'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Controller('tipoactividades'),
    __metadata("design:paramtypes", [tipo_actividades_service_1.TipoActividadesService])
], TipoActividadesController);
exports.TipoActividadesController = TipoActividadesController;
//# sourceMappingURL=tipo_actividades.controller.js.map