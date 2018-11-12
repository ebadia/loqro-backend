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
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Account_entity_1 = require("../../entities/Account.entity");
const User_entity_1 = require("../../entities/User.entity");
const token_secret = process.env.TOKEN_SECRET || 'mamamia';
let AccountsService = class AccountsService {
    constructor(accountsRepo, manager) {
        this.accountsRepo = accountsRepo;
        this.manager = manager;
    }
    login(account) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.accountsRepo.findOne({
                where: { email: account.email }
            });
            if (user) {
                const passwOk = yield this.compareHash(account.password, user.password);
                if (!passwOk) {
                    throw new common_1.UnauthorizedException();
                }
                else {
                    return this.createToken(user);
                }
            }
            else {
                throw new common_1.NotFoundException();
            }
        });
    }
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const acc = yield this.accountsRepo
                .createQueryBuilder('account')
                .select(['account.id', 'account.email'])
                .where('account.id=:id', { id })
                .leftJoinAndSelect('account.user', 'user')
                .getOne();
            if (!acc) {
                throw new common_1.NotFoundException();
            }
            return acc;
        });
    }
    findUserByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const acc = yield this.accountsRepo
                .createQueryBuilder('account')
                .select(['account.id', 'account.email'])
                .leftJoinAndSelect('account.user', 'user')
                .where('account.user.id=:id', { id })
                .getOne();
            if (!acc) {
                throw new common_1.NotFoundException();
            }
            return acc;
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const acc = yield this.accountsRepo
                .createQueryBuilder('account')
                .select(['account.id', 'account.email'])
                .where('email=:email', { email })
                .leftJoinAndSelect('account.user', 'user')
                .getOne();
            if (!acc) {
                throw new common_1.NotFoundException();
            }
            return acc;
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield this.accountsRepo.findOne({ email: user.email });
            if (!existe) {
                const newAccount = yield this.accountsRepo.create(user);
                console.log('NEWACC', newAccount);
                const newUser = yield this.manager.create(User_entity_1.User, {});
                newAccount.user = yield this.manager.save(User_entity_1.User, newUser);
                return yield this.accountsRepo.save(newAccount);
            }
            throw new common_1.ConflictException();
        });
    }
    compareHash(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.compare(password, hash);
        });
    }
    createToken(user) {
        console.log('USER INTO TOKEN', user);
        const expiresIn = 60 * 60 * 10;
        return jwt.sign(Object.assign({}, user), token_secret, { expiresIn });
    }
    validateUser(signedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.accountsRepo.findOne({
                where: { email: signedUser.email }
            });
            if (_.isEmpty(user)) {
                return false;
            }
            else {
                return true;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.accountsRepo.find();
        });
    }
    findOne(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const acc = yield this.accountsRepo
                .createQueryBuilder()
                .select()
                .where('email=:email', { email: user.email })
                .getOne();
            if (!acc) {
                throw new common_1.NotFoundException();
            }
            return acc;
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const acc = yield this.accountsRepo.update(id, payload);
            console.log('UPDATED', acc);
            return yield this.accountsRepo.findOne(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const acc = yield this.accountsRepo.findOne(id);
            if (!acc) {
                throw new common_1.NotFoundException();
            }
            this.accountsRepo.remove(acc);
        });
    }
};
AccountsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(Account_entity_1.Account)),
    __param(1, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager])
], AccountsService);
exports.AccountsService = AccountsService;
//# sourceMappingURL=accounts.service.js.map