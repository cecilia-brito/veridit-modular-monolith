import { Module } from '@nestjs/common';
import { AuditController } from './infrastructure/adapters/inbound/AuditController';
import { ListRecordsUseCaseToken } from './application/ports/in/ListRecordsUseCase';
import { ListRecordsService } from './application/usecases/ListRecordsService';
import { RecordRepositoryPortToken } from './application/ports/out/RecordRepositoryPort';
import { PrismaRecordRepository } from './infrastructure/adapters/outbound/PrismaRecordRepository';

@Module({
  controllers: [AuditController],
  providers: [
    {
      provide: ListRecordsUseCaseToken,
      useClass: ListRecordsService,
    },
    {
      provide: RecordRepositoryPortToken,
      useClass: PrismaRecordRepository,
    },
  ],
})
export class AuditModule {}
