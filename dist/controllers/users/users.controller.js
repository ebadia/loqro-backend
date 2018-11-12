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
const users_service_1 = require("./users.service");
const User_entity_1 = require("../../entities/User.entity");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./dto/create-user.dto");
const passport_1 = require("@nestjs/passport");
let UsersController = class UsersController {
    constructor(UsersService) {
        this.UsersService = UsersService;
    }
    findAll(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.UsersService.findAll(page, size);
        });
    }
    finOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.UsersService.findOne(id);
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.UsersService.create(user);
        });
    }
    update(id, User) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.UsersService.update(id, User);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.UsersService.delete(id);
        });
    }
    alumno(id, alumno) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.UsersService.alumno(id, alumno);
        });
    }
    tutor(id, tutor) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.UsersService.tutor(id, tutor);
        });
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiImplicitQuery({
        name: 'page',
        required: false,
        type: 'number',
        description: 'First page is index 0'
    }),
    swagger_1.ApiImplicitQuery({ name: 'size', required: false, type: 'number' }),
    __param(0, common_1.Query('page')), __param(1, common_1.Query('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "finOne", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, User_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
__decorate([
    common_1.Get(':id/alumno/:alumno'),
    __param(0, common_1.Param('id')), __param(1, common_1.Param('alumno')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "alumno", null);
__decorate([
    common_1.Get(':id/tutor/:tutor'),
    __param(0, common_1.Param('id')), __param(1, common_1.Param('tutor')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "tutor", null);
UsersController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUseTags('Users'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map