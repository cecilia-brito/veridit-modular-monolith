import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CaptureController } from './infrastructure/adapters/inbound/CaptureController';
import { StartCaptureService } from './application/usecases/StartCaptureService';
import { StartCaptureUseCaseToken } from './application/ports/in/StartCaptureUseCase';
import { FinishCaptureService } from './application/usecases/FinishCaptureService';
import { FinishCaptureUseCaseToken } from './application/ports/in/FinishCaptureUseCase';
import { PrismaCaptureRepository } from './infrastructure/adapters/outbound/PrismaCapture.repository';
import { CaptureRepositoryPortToken } from './application/ports/out/CaptureRepositoryPort';

@Module({
  imports: [PrismaModule],
  controllers: [CaptureController],
  providers: [
    {
      provide: StartCaptureUseCaseToken,
      useClass: StartCaptureService,
    },
    {
      provide: FinishCaptureUseCaseToken,
      useClass: FinishCaptureService,
    },
    {
      provide: CaptureRepositoryPortToken,
      useClass: PrismaCaptureRepository,
    },
  ],
})
export class CaptureModule {}