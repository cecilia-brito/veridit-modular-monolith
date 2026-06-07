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
exports.RecoverPasswordService = void 0;
const common_1 = require("@nestjs/common");
const UserRepositoryPort_1 = require("../ports/out/UserRepositoryPort");
const MailerPort_1 = require("../ports/out/MailerPort");
const Email_1 = require("../../domain/value-objects/Email");
let RecoverPasswordService = class RecoverPasswordService {
    constructor(userRepository, mailerPort) {
        this.userRepository = userRepository;
        this.mailerPort = mailerPort;
    }
    async recoverPassword(email) {
        const emailVO = Email_1.Email.create(email);
        const user = await this.userRepository.findByEmail(emailVO.value);
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        const resetToken = Math.random().toString(36).substring(2, 15);
        const resetUrl = `https://veridit.com/reset-password?token=${resetToken}`;
        const subject = 'Recuperação de Senha - Veridit';
        const body = `Olá, ${user.fullName}. Use este link para resetar sua senha: ${resetUrl}`;
        await this.mailerPort.sendEmail(user.email.value, subject, body);
    }
};
exports.RecoverPasswordService = RecoverPasswordService;
exports.RecoverPasswordService = RecoverPasswordService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(UserRepositoryPort_1.UserRepositoryPortToken)),
    __param(1, (0, common_1.Inject)(MailerPort_1.MailerPortToken)),
    __metadata("design:paramtypes", [Object, Object])
], RecoverPasswordService);
//# sourceMappingURL=RecoverPasswordService.js.map