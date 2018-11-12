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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Grupo_entity_1 = require("./../../entities/Grupo.entity");
let GruposService = class GruposService {
    constructor(GrupoRepo, connection) {
        this.GrupoRepo = GrupoRepo;
        this.connection = connection;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.GrupoRepo.find();
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.GrupoRepo.findOne(id);
        });
    }
    create(Grupo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.GrupoRepo.save(Grupo);
        });
    }
    update(id, Grupo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.GrupoRepo.update(id, Grupo);
            return yield this.GrupoRepo.findOne(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = yield this.GrupoRepo.findOne(id);
            if (!obj) {
                throw new common_1.NotFoundException();
            }
            yield this.GrupoRepo.remove(obj);
        });
    }
};
GruposService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(Grupo_entity_1.Grupo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Connection])
], GruposService);
exports.GruposService = GruposService;
//# sourceMappingURL=grupos.service.js.map