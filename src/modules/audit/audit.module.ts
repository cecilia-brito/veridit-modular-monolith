import { Module } from '@nestjs/common';
import { AuditController } from './infrastructure/adapters/inbound/AuditController';
import { RecordsUseCaseToken } from './application/ports/in/RecordsUseCase';
import { RecordsService } from './application/usecases/RecordsService';
import { RecordRepositoryPortToken } from './application/ports/out/RecordRepositoryPort';
import { PrismaRecordRepository } from './infrastructure/adapters/outbound/PrismaRecordRepository';

@Module({
  controllers: [AuditController],
  providers: [
    {
      provide: RecordsUseCaseToken,
      useClass: RecordsService,
    },
    {
      provide: RecordRepositoryPortToken,
      useClass: PrismaRecordRepository,
    },
  ],
})
export class AuditModule { }
