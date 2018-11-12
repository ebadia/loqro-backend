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
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const cors_1 = require("@nest-middlewares/cors");
const mailer_1 = require("@nest-modules/mailer");
const sgTransport = require("nodemailer-sendgridv3-transport");
const accounts_module_1 = require("./controllers/accounts/accounts.module");
const users_module_1 = require("./controllers/users/users.module");
const dietas_module_1 = require("./controllers/dietas/dietas.module");
const cursos_module_1 = require("./controllers/cursos/cursos.module");
const grupos_module_1 = require("./controllers/grupos/grupos.module");
const tipo_actividades_module_1 = require("./controllers/tipo_actividades/tipo_actividades.module");
const actividades_module_1 = require("./controllers/actividades/actividades.module");
const compras_module_1 = require("./controllers/compras/compras.module");
const mails_module_1 = require("./controllers/mails/mails.module");
let AppModule = class AppModule {
    constructor() { }
    configure(consumer) {
        consumer.apply(cors_1.CorsMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(),
            mailer_1.MailerModule.forRoot({
                transport: sgTransport({
                    auth: {
                        api_key: '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'
                    }
                }),
                defaults: {
                    from: '"ampanova-mailer" <enric.badia@gmail.com>'
                },
                templateDir: './src/common/email'
            }),
            accounts_module_1.AccountsModule,
            users_module_1.UsersModule,
            dietas_module_1.DietasModule,
            cursos_module_1.CursosModule,
            grupos_module_1.GruposModule,
            tipo_actividades_module_1.TipoActividadesModule,
            actividades_module_1.ActividadesModule,
            compras_module_1.ComprasModule,
            mails_module_1.MailsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map