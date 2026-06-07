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
exports.AuditController = void 0;
const common_1 = require("@nestjs/common");
const ListRecordsUseCase_1 = require("../../../application/ports/in/ListRecordsUseCase");
let AuditController = class AuditController {
    constructor(listRecordsUseCase) {
        this.listRecordsUseCase = listRecordsUseCase;
    }
    async listUserRecords(userId) {
        const records = await this.listRecordsUseCase.execute(userId);
        return records.map(record => ({
            id: record.id,
            title: record.title,
            siteUrl: record.siteUrl,
            status: record.status,
            startTime: record.startTime,
            endTime: record.endTime,
            imageCount: record.imageCount,
            videoCount: record.videoCount,
            details: record.details,
        }));
    }
};
exports.AuditController = AuditController;
__decorate([
    (0, common_1.Get)('records/:userId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuditController.prototype, "listUserRecords", null);
exports.AuditController = AuditController = __decorate([
    (0, common_1.Controller)('audit'),
    __param(0, (0, common_1.Inject)(ListRecordsUseCase_1.ListRecordsUseCaseToken)),
    __metadata("design:paramtypes", [Object])
], AuditController);
//# sourceMappingURL=AuditController.js.map