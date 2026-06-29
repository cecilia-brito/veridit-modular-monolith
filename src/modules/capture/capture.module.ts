import { Module } from '@nestjs/common';
import { CaptureController } from './infrastructure/adapters/inbound/CaptureController';
import { StartCaptureService } from './application/usecases/StartCaptureService';
import { StartCaptureUseCaseToken } from './application/ports/in/StartCaptureUseCase';
import { PrismaCaptureRepository } from './infrastructure/adapters/outbound/PrismaCapture.repository';
import { CaptureRepositoryPortToken } from './application/ports/out/CaptureRepositoryPort';
import { CaptureNotificationPortToken } from './application/ports/out/CaptureNotificationPort';
import { CaptureNotificationAdapter } from './infrastructure/adapters/outbound/CaptureNotificationAdapter';
import { CaptureNotificationListener } from './infrastructure/adapters/inbound/events/CaptureNotificationListener';
import { MockCaptureWorker } from './infrastructure/adapters/inbound/events/MockCaptureWorker';

@Module({
  controllers: [CaptureController],
  providers: [
    {
      provide: StartCaptureUseCaseToken,
      useClass: StartCaptureService,
    },
    {
      provide: CaptureRepositoryPortToken,
      useClass: PrismaCaptureRepository,
    },
    {
      provide: CaptureNotificationPortToken,
      useClass: CaptureNotificationAdapter,
    },
    CaptureNotificationListener,
    MockCaptureWorker,
  ],
})
export class CaptureModule {}