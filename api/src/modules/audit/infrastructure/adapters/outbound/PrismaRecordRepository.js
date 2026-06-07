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
exports.PrismaRecordRepository = void 0;
const common_1 = require("@nestjs/common");
const Record_1 = require("../../../domain/entities/Record");
let PrismaRecordRepository = class PrismaRecordRepository {
    constructor() {
        this.recordsDb = new Map();
        const mockRecord1 = Record_1.Record.create({
            title: 'Captura de Prova - Site G1',
            userId: 'mock-user-123',
            siteUrl: 'https://g1.globo.com',
            details: 'Evidência de notícia falsa',
        }, 'rec-1');
        mockRecord1.complete(3, 1, 'Capturado com sucesso usando Playwright');
        const mockRecord2 = Record_1.Record.create({
            title: 'Captura de Ofensa - Twitter',
            userId: 'mock-user-123',
            siteUrl: 'https://twitter.com/post/12345',
            details: 'Post contendo difamação',
        }, 'rec-2');
        this.save(mockRecord1);
        this.save(mockRecord2);
    }
    async save(record) {
        const rawData = {
            id: record.id,
            title: record.title,
            userId: record.userId,
            siteUrl: record.siteUrl,
            startTime: record.startTime,
            endTime: record.endTime,
            details: record.details,
            status: record.status,
            imageCount: record.imageCount,
            videoCount: record.videoCount,
        };
        this.recordsDb.set(record.id, rawData);
    }
    async findByUserId(userId) {
        const list = [];
        for (const rawData of this.recordsDb.values()) {
            if (rawData.userId === userId) {
                list.push(this.mapToDomain(rawData));
            }
        }
        return list;
    }
    async findById(id) {
        const rawData = this.recordsDb.get(id);
        if (!rawData)
            return null;
        return this.mapToDomain(rawData);
    }
    mapToDomain(rawData) {
        const record = Record_1.Record.create({
            title: rawData.title,
            userId: rawData.userId,
            siteUrl: rawData.siteUrl,
            details: rawData.details,
        }, rawData.id);
        if (rawData.status === 'COMPLETED') {
            record.complete(rawData.imageCount, rawData.videoCount, rawData.details);
        }
        else if (rawData.status === 'FAILED') {
            record.fail(rawData.details || 'Erro desconhecido');
        }
        return record;
    }
};
exports.PrismaRecordRepository = PrismaRecordRepository;
exports.PrismaRecordRepository = PrismaRecordRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaRecordRepository);
//# sourceMappingURL=PrismaRecordRepository.js.map