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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const UserRepositoryPort_1 = require("../ports/out/UserRepositoryPort");
const Email_1 = require("../../domain/value-objects/Email");
let LoginService = class LoginService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async login(command) {
        const emailVO = Email_1.Email.create(command.email);
        const user = await this.userRepository.findByEmail(emailVO.value);
        if (!user || !user.isActive) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const isPasswordValid = await user.password.compare(command.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const mockToken = `mock-jwt-token-for-user-${user.id}`;
        return {
            accessToken: mockToken,
            userId: user.id,
            role: user.role,
        };
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(UserRepositoryPort_1.UserRepositoryPortToken)),
    __metadata("design:paramtypes", [Object])
], LoginService);
//# sourceMappingURL=LoginService.js.map