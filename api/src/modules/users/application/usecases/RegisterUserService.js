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
exports.RegisterUserService = void 0;
const common_1 = require("@nestjs/common");
const UserRepositoryPort_1 = require("../ports/out/UserRepositoryPort");
const User_1 = require("../../domain/entities/User");
const Email_1 = require("../../domain/value-objects/Email");
const Password_1 = require("../../domain/value-objects/Password");
const CPF_1 = require("../../domain/value-objects/CPF");
let RegisterUserService = class RegisterUserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async registerUser(command) {
        const emailVO = Email_1.Email.create(command.email);
        const cpfVO = CPF_1.CPF.create(command.cpf);
        const passwordVO = Password_1.Password.create(command.password);
        const existingEmail = await this.userRepository.findByEmail(emailVO.value);
        if (existingEmail) {
            throw new Error('E-mail já cadastrado');
        }
        const existingCpf = await this.userRepository.findByCpf(cpfVO.value);
        if (existingCpf) {
            throw new Error('CPF já cadastrado');
        }
        const hashedPasswordValue = await passwordVO.getHashedValue();
        const hashedPasswordVO = Password_1.Password.createFromHash(hashedPasswordValue);
        const user = User_1.User.create({
            fullName: command.fullName,
            email: emailVO,
            password: hashedPasswordVO,
            cpf: cpfVO,
            role: command.role,
            oabNumber: command.oabNumber,
        });
        await this.userRepository.save(user);
        return user.id;
    }
};
exports.RegisterUserService = RegisterUserService;
exports.RegisterUserService = RegisterUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(UserRepositoryPort_1.UserRepositoryPortToken)),
    __metadata("design:paramtypes", [Object])
], RegisterUserService);
//# sourceMappingURL=RegisterUserService.js.map