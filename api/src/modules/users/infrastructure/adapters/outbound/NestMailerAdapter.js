"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestMailerAdapter = void 0;
const common_1 = require("@nestjs/common");
let NestMailerAdapter = class NestMailerAdapter {
    async sendEmail(to, subject, body) {
        console.log('----------------------------------------------------');
        console.log(`[E-MAIL SIMULADOR] Enviando e-mail para: ${to}`);
        console.log(`[E-MAIL SIMULADOR] Assunto: ${subject}`);
        console.log(`[E-MAIL SIMULADOR] Mensagem: ${body}`);
        console.log('----------------------------------------------------');
    }
};
exports.NestMailerAdapter = NestMailerAdapter;
exports.NestMailerAdapter = NestMailerAdapter = __decorate([
    (0, common_1.Injectable)()
], NestMailerAdapter);
//# sourceMappingURL=NestMailerAdapter.js.map