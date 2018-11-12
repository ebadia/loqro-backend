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
const typeorm_1 = require("typeorm");
const Actividad_entity_1 = require("./Actividad.entity");
const Grupo_entity_1 = require("./Grupo.entity");
let Curso = class Curso {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Curso.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], Curso.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], Curso.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], Curso.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Actividad_entity_1.Actividad, actividad => actividad.curso),
    __metadata("design:type", Number)
], Curso.prototype, "actividad", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Grupo_entity_1.Grupo, grupo => grupo.curso),
    typeorm_1.JoinTable(),
    __metadata("design:type", Grupo_entity_1.Grupo)
], Curso.prototype, "grupo", void 0);
Curso = __decorate([
    typeorm_1.Entity()
], Curso);
exports.Curso = Curso;
//# sourceMappingURL=Curso.entity.js.map