"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const common_1 = require("@nestjs/common");
const User_1 = require("../../../domain/entities/User");
const Email_1 = require("../../../domain/value-objects/Email");
const Password_1 = require("../../../domain/value-objects/Password");
const CPF_1 = require("../../../domain/value-objects/CPF");
let PrismaUserRepository = class PrismaUserRepository {
    constructor() {
        this.usersDb = new Map();
    }
    async save(user) {
        const rawData = {
            id: user.id,
            fullName: user.fullName,
            email: user.email.value,
            password: user.password.value,
            cpf: user.cpf.value,
            role: user.role,
            oabNumber: user.oabNumber,
            isActive: user.isActive,
            createdAt: user.createdAt,
        };
        this.usersDb.set(user.id, rawData);
        console.log(`[Repository] Usuário salvo no banco: ${user.fullName} (${user.id})`);
    }
    async findByEmail(email) {
        for (const rawData of this.usersDb.values()) {
            if (rawData.email === email) {
                return this.mapToDomain(rawData);
            }
        }
        return null;
    }
    async findById(id) {
        const rawData = this.usersDb.get(id);
        if (!rawData)
            return null;
        return this.mapToDomain(rawData);
    }
    async findByCpf(cpf) {
        for (const rawData of this.usersDb.values()) {
            if (rawData.cpf === cpf) {
                return this.mapToDomain(rawData);
            }
        }
        return null;
    }
    mapToDomain(rawData) {
        return User_1.User.create({
            fullName: rawData.fullName,
            email: Email_1.Email.create(rawData.email),
            password: Password_1.Password.createFromHash(rawData.password),
            cpf: CPF_1.CPF.create(rawData.cpf),
            role: rawData.role,
            oabNumber: rawData.oabNumber,
        }, rawData.id);
    }
};
exports.PrismaUserRepository = PrismaUserRepository;
exports.PrismaUserRepository = PrismaUserRepository = __decorate([
    (0, common_1.Injectable)()
], PrismaUserRepository);
//# sourceMappingURL=PrismaUserRepository.js.map