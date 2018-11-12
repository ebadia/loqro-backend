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
const _ = require("lodash");
const User_entity_1 = require("./../../entities/User.entity");
let UsersService = class UsersService {
    constructor(UserRepo, connection) {
        this.UserRepo = UserRepo;
        this.connection = connection;
    }
    findAll(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.UserRepo.find({
                relations: ['account', 'childs', 'parents'],
                skip: page * size,
                take: size
            });
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const usr = yield this.UserRepo.createQueryBuilder('user')
                .select()
                .where('user.id=:id', { id })
                .leftJoinAndSelect('user.account', 'account')
                .leftJoinAndSelect('user.childs', 'childs')
                .leftJoinAndSelect('user.parents', 'parents')
                .getOne();
            if (!usr) {
                throw new common_1.NotFoundException();
            }
            return usr;
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield this.UserRepo.create(user);
            return yield this.UserRepo.save(newUser);
        });
    }
    update(id, User) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.UserRepo.update(id, User);
            return yield this.UserRepo.findOne(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = yield this.UserRepo.findOne(id);
            if (!obj) {
                throw new common_1.NotFoundException();
            }
            yield this.UserRepo.remove(obj);
        });
    }
    alumno(id, alumno) {
        return __awaiter(this, void 0, void 0, function* () {
            const tutor = yield this.UserRepo.findOne({ id }, { relations: ['childs'] });
            if (tutor && tutor.type === 'Tutor') {
                const child = yield this.UserRepo.findOne(alumno);
                if (!child) {
                    throw new common_1.NotFoundException();
                }
                else if (!_.isUndefined(_.find(tutor.childs, ['id', child.id]))) {
                    throw new common_1.ConflictException();
                }
                else {
                    tutor.childs.push(child);
                    return yield this.UserRepo.save(tutor);
                }
            }
            else {
                throw new common_1.NotFoundException();
            }
        });
    }
    tutor(id, tutor) {
        return __awaiter(this, void 0, void 0, function* () {
            const child = yield this.UserRepo.findOne({ id }, { relations: ['parents'] });
            if (child && child.type === 'Alumno') {
                const parent = yield this.UserRepo.findOne(tutor);
                if (!parent) {
                    throw new common_1.NotFoundException();
                }
                else if (!_.isUndefined(_.find(child.parents, ['id', parent.id]))) {
                    throw new common_1.ConflictException();
                }
                else {
                    child.parents.push(parent);
                    return yield this.UserRepo.save(child);
                }
            }
            else {
                throw new common_1.NotFoundException();
            }
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(User_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Connection])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map