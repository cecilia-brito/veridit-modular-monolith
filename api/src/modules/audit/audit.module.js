"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditModule = void 0;
const common_1 = require("@nestjs/common");
const AuditController_1 = require("./infrastructure/adapters/inbound/AuditController");
const ListRecordsUseCase_1 = require("./application/ports/in/ListRecordsUseCase");
const ListRecordsService_1 = require("./application/usecases/ListRecordsService");
const RecordRepositoryPort_1 = require("./application/ports/out/RecordRepositoryPort");
const PrismaRecordRepository_1 = require("./infrastructure/adapters/outbound/PrismaRecordRepository");
let AuditModule = class AuditModule {
};
exports.AuditModule = AuditModule;
exports.AuditModule = AuditModule = __decorate([
    (0, common_1.Module)({
        controllers: [AuditController_1.AuditController],
        providers: [
            {
                provide: ListRecordsUseCase_1.ListRecordsUseCaseToken,
                useClass: ListRecordsService_1.ListRecordsService,
            },
            {
                provide: RecordRepositoryPort_1.RecordRepositoryPortToken,
                useClass: PrismaRecordRepository_1.PrismaRecordRepository,
            },
        ],
    })
], AuditModule);
//# sourceMappingURL=audit.module.js.map