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
const compras_service_1 = require("./compras.service");
const Compra_entity_1 = require("../../entities/Compra.entity");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let ComprasController = class ComprasController {
    constructor(ComprasService) {
        this.ComprasService = ComprasService;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ComprasService.findAll();
        });
    }
    finOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ComprasService.findOne(id);
        });
    }
    create(Compra) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ComprasService.create(Compra);
        });
    }
    update(id, Compra) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ComprasService.update(id, Compra);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ComprasService.delete(id);
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "finOne", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Compra_entity_1.Compra]),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "create", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Compra_entity_1.Compra]),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "delete", null);
ComprasController = __decorate([
    swagger_1.ApiUseTags('Compras'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Controller('compras'),
    __metadata("design:paramtypes", [compras_service_1.ComprasService])
], ComprasController);
exports.ComprasController = ComprasController;
//# sourceMappingURL=compras.controller.js.map