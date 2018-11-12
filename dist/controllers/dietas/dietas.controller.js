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
const dietas_service_1 = require("./dietas.service");
const Dieta_entity_1 = require("../../entities/Dieta.entity");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let DietasController = class DietasController {
    constructor(dietasService) {
        this.dietasService = dietasService;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dietasService.findAll();
        });
    }
    finOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dietasService.findOne(id);
        });
    }
    create(dieta) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dietasService.create(dieta);
        });
    }
    update(id, dieta) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dietasService.update(id, dieta);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dietasService.delete(id);
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DietasController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DietasController.prototype, "finOne", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Dieta_entity_1.Dieta]),
    __metadata("design:returntype", Promise)
], DietasController.prototype, "create", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Dieta_entity_1.Dieta]),
    __metadata("design:returntype", Promise)
], DietasController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DietasController.prototype, "delete", null);
DietasController = __decorate([
    swagger_1.ApiUseTags('Dietas'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Controller('dietas'),
    __metadata("design:paramtypes", [dietas_service_1.DietasService])
], DietasController);
exports.DietasController = DietasController;
//# sourceMappingURL=dietas.controller.js.map