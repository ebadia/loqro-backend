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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let MailsService = class MailsService {
    constructor(mailerProvider) {
        this.mailerProvider = mailerProvider;
    }
    welcome(payload) {
        return this.mailerProvider.sendMail({
            to: payload.to,
            subject: 'Bienvenido a Ampanova',
            template: 'welcome',
            context: payload
        });
    }
    actividadMail(payload) {
        return this.mailerProvider.sendMail({
            to: 'enric.badia@gmail.com',
            subject: 'Aviso de nueva actividad del colegio disponible.',
            template: 'actividad',
            context: payload
        });
    }
};
MailsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('MailerProvider')),
    __metadata("design:paramtypes", [Object])
], MailsService);
exports.MailsService = MailsService;
//# sourceMappingURL=mails.service.js.map