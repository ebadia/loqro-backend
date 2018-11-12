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
const User_entity_1 = require("./User.entity");
const typeorm_1 = require("typeorm");
const Actividad_entity_1 = require("./Actividad.entity");
const moment = require("moment");
let Compra = class Compra {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Compra.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], Compra.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], Compra.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('date', { default: moment().format('YYYY-MM-DD') }),
    __metadata("design:type", String)
], Compra.prototype, "aviso", void 0);
__decorate([
    typeorm_1.Column('date', { nullable: true }),
    __metadata("design:type", String)
], Compra.prototype, "reserva", void 0);
__decorate([
    typeorm_1.Column('date', { nullable: true }),
    __metadata("design:type", String)
], Compra.prototype, "compra", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_entity_1.User, user => user.compras),
    __metadata("design:type", User_entity_1.User)
], Compra.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Actividad_entity_1.Actividad, actividad => actividad.compras),
    __metadata("design:type", Actividad_entity_1.Actividad)
], Compra.prototype, "actividad", void 0);
Compra = __decorate([
    typeorm_1.Entity()
], Compra);
exports.Compra = Compra;
//# sourceMappingURL=Compra.entity.js.map