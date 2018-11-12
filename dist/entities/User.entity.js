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
Object.defineProperty(exports, "__esModule", { value: true });
var User_1;
const Actividad_entity_1 = require("./Actividad.entity");
const typeorm_1 = require("typeorm");
const Account_entity_1 = require("./Account.entity");
const Compra_entity_1 = require("./Compra.entity");
let User = User_1 = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        unique: true,
        length: 12
    }),
    __metadata("design:type", String)
], User.prototype, "mobile", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 12
    }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 8
    }),
    __metadata("design:type", String)
], User.prototype, "sex", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 16
    }),
    __metadata("design:type", String)
], User.prototype, "cp", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], User.prototype, "province", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 16
    }),
    __metadata("design:type", String)
], User.prototype, "type", void 0);
__decorate([
    typeorm_1.OneToOne(type => Account_entity_1.Account, account => account.user),
    __metadata("design:type", Account_entity_1.Account)
], User.prototype, "account", void 0);
__decorate([
    typeorm_1.ManyToMany(type => User_1, user => user.parents),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], User.prototype, "childs", void 0);
__decorate([
    typeorm_1.ManyToMany(type => User_1, user => user.childs),
    __metadata("design:type", Array)
], User.prototype, "parents", void 0);
__decorate([
    typeorm_1.OneToMany(type => Actividad_entity_1.Actividad, actividad => actividad.user),
    __metadata("design:type", Array)
], User.prototype, "actividades", void 0);
__decorate([
    typeorm_1.OneToMany(type => Compra_entity_1.Compra, compra => compra.user),
    __metadata("design:type", Array)
], User.prototype, "compras", void 0);
User = User_1 = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=User.entity.js.map