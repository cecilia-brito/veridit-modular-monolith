import { Module } from '@nestjs/common';
import { AuditController } from './infrastructure/adapters/inbound/AuditController';
import { RecordsUseCaseToken } from './application/ports/in/RecordsUseCase';
import { RecordsService } from './application/usecases/RecordsService';
import { RecordRepositoryPortToken } from './application/ports/out/RecordRepositoryPort';
import { PrismaRecordRepository } from './infrastructure/adapters/outbound/PrismaRecordRepository';
import { PdfUseCaseToken } from '../../shared/application/ports/in/PdfUseCase';
import { PdfService } from '../../shared/application/usecases/PdfService';
import { UserRepositoryPortToken } from '../users/application/ports/out/UserRepositoryPort';
import { PrismaUserRepository } from '../users/infrastructure/adapters/outbound/PrismaUserRepository';

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
    {
      provide: UserRepositoryPortToken,
      useClass: PrismaUserRepository,
    },
    {
      provide: PdfUseCaseToken,
      useClass: PdfService,
    }
  ],
})
export class AuditModule { }
