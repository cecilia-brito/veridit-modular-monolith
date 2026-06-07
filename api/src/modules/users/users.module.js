"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const UsersController_1 = require("./infrastructure/adapters/inbound/UsersController");
const RegisterUserUseCase_1 = require("./application/ports/in/RegisterUserUseCase");
const RegisterUserService_1 = require("./application/usecases/RegisterUserService");
const LoginUseCase_1 = require("./application/ports/in/LoginUseCase");
const LoginService_1 = require("./application/usecases/LoginService");
const RecoverPasswordUseCase_1 = require("./application/ports/in/RecoverPasswordUseCase");
const RecoverPasswordService_1 = require("./application/usecases/RecoverPasswordService");
const LogoutUseCase_1 = require("./application/ports/in/LogoutUseCase");
const LogoutService_1 = require("./application/usecases/LogoutService");
const UserRepositoryPort_1 = require("./application/ports/out/UserRepositoryPort");
const PrismaUserRepository_1 = require("./infrastructure/adapters/outbound/PrismaUserRepository");
const MailerPort_1 = require("./application/ports/out/MailerPort");
const NestMailerAdapter_1 = require("./infrastructure/adapters/outbound/NestMailerAdapter");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [UsersController_1.UsersController],
        providers: [
            {
                provide: RegisterUserUseCase_1.RegisterUserUseCaseToken,
                useClass: RegisterUserService_1.RegisterUserService,
            },
            {
                provide: LoginUseCase_1.LoginUseCaseToken,
                useClass: LoginService_1.LoginService,
            },
            {
                provide: RecoverPasswordUseCase_1.RecoverPasswordUseCaseToken,
                useClass: RecoverPasswordService_1.RecoverPasswordService,
            },
            {
                provide: LogoutUseCase_1.LogoutUseCaseToken,
                useClass: LogoutService_1.LogoutService,
            },
            {
                provide: UserRepositoryPort_1.UserRepositoryPortToken,
                useClass: PrismaUserRepository_1.PrismaUserRepository,
            },
            {
                provide: MailerPort_1.MailerPortToken,
                useClass: NestMailerAdapter_1.NestMailerAdapter,
            },
        ],
        exports: [
            UserRepositoryPort_1.UserRepositoryPortToken,
        ],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map