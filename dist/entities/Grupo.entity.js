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
const Curso_entity_1 = require("./Curso.entity");
let Grupo = class Grupo {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Grupo.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], Grupo.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        select: false
    }),
    __metadata("design:type", Date)
], Grupo.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('character varying', {
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], Grupo.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Curso_entity_1.Curso, curso => curso.grupo),
    __metadata("design:type", Curso_entity_1.Curso)
], Grupo.prototype, "curso", void 0);
Grupo = __decorate([
    typeorm_1.Entity()
], Grupo);
exports.Grupo = Grupo;
//# sourceMappingURL=Grupo.entity.js.map