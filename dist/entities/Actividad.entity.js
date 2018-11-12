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
const TipoActividad_entity_1 = require("./TipoActividad.entity");
const typeorm_1 = require("typeorm");
const Curso_entity_1 = require("./Curso.entity");
const Compra_entity_1 = require("./Compra.entity");
let Actividad = class Actividad {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Actividad.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], Actividad.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], Actividad.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: false,
        length: 255
    }),
    __metadata("design:type", String)
], Actividad.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], Actividad.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.Column('real', { nullable: true }),
    __metadata("design:type", String)
], Actividad.prototype, "precio", void 0);
__decorate([
    typeorm_1.Column('int', { nullable: true }),
    __metadata("design:type", Number)
], Actividad.prototype, "iva", void 0);
__decorate([
    typeorm_1.Column('int', { nullable: true }),
    __metadata("design:type", Number)
], Actividad.prototype, "recargo", void 0);
__decorate([
    typeorm_1.Column('date', { nullable: true }),
    __metadata("design:type", String)
], Actividad.prototype, "final_recargo", void 0);
__decorate([
    typeorm_1.Column('date', { nullable: true }),
    __metadata("design:type", String)
], Actividad.prototype, "fecha_inicio", void 0);
__decorate([
    typeorm_1.Column('date', { nullable: true }),
    __metadata("design:type", String)
], Actividad.prototype, "fecha_fin", void 0);
__decorate([
    typeorm_1.Column('date', { nullable: true }),
    __metadata("design:type", String)
], Actividad.prototype, "inicio_contratacion", void 0);
__decorate([
    typeorm_1.Column('date', { nullable: true }),
    __metadata("design:type", String)
], Actividad.prototype, "final_contratacion", void 0);
__decorate([
    typeorm_1.Column('boolean', { nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Actividad.prototype, "obligtoria", void 0);
__decorate([
    typeorm_1.Column('boolean', { nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Actividad.prototype, "activa", void 0);
__decorate([
    typeorm_1.Column('boolean', { nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Actividad.prototype, "pago_permitido", void 0);
__decorate([
    typeorm_1.Column('int', { nullable: true }),
    __metadata("design:type", String)
], Actividad.prototype, "minimo_alumno", void 0);
__decorate([
    typeorm_1.Column('int', { nullable: true }),
    __metadata("design:type", String)
], Actividad.prototype, "maximo_alumno", void 0);
__decorate([
    typeorm_1.Column('int', { nullable: true }),
    __metadata("design:type", String)
], Actividad.prototype, "minimo_usuarios", void 0);
__decorate([
    typeorm_1.Column('int', { nullable: true }),
    __metadata("design:type", String)
], Actividad.prototype, "maximo_usuarios", void 0);
__decorate([
    typeorm_1.OneToOne(type => TipoActividad_entity_1.TipoActividad),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Number)
], Actividad.prototype, "tipo", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Curso_entity_1.Curso, curso => curso.actividad),
    typeorm_1.JoinTable(),
    __metadata("design:type", Curso_entity_1.Curso)
], Actividad.prototype, "curso", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_entity_1.User, user => user.actividades),
    __metadata("design:type", User_entity_1.User)
], Actividad.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(type => Compra_entity_1.Compra, compra => compra.user),
    __metadata("design:type", Array)
], Actividad.prototype, "compras", void 0);
Actividad = __decorate([
    typeorm_1.Entity()
], Actividad);
exports.Actividad = Actividad;
//# sourceMappingURL=Actividad.entity.js.map