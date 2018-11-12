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
const mails_service_1 = require("./mails.service");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const welcome_mail_dto_1 = require("./dto/welcome-mail.dto");
const Compra_entity_1 = require("../../entities/Compra.entity");
let MailsController = class MailsController {
    constructor(mailsService) {
        this.mailsService = mailsService;
    }
    postMail(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mailsService.welcome(payload);
        });
    }
    actividadMail(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mailsService.actividadMail(payload);
        });
    }
};
__decorate([
    common_1.Post('/welcome'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [welcome_mail_dto_1.WelcomeMailDto]),
    __metadata("design:returntype", Promise)
], MailsController.prototype, "postMail", null);
__decorate([
    common_1.Post('/actividad'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Compra_entity_1.Compra]),
    __metadata("design:returntype", Promise)
], MailsController.prototype, "actividadMail", null);
MailsController = __decorate([
    swagger_1.ApiUseTags('Mails'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Controller('mails'),
    __metadata("design:paramtypes", [mails_service_1.MailsService])
], MailsController);
exports.MailsController = MailsController;
//# sourceMappingURL=mails.controller.js.map