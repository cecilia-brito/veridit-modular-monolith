import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from './modules/users/users.module';
import { AuditModule } from './modules/audit/audit.module';
import { CreditsModule } from './modules/credits/credits.module';
import { CaptureModule } from './modules/capture/capture.module';
import { EmailModule } from './shared/infrastructure/email/email.module';
import { PdfUseCaseToken } from './shared/application/ports/in/PdfUseCase';
import { PdfService } from './shared/application/usecases/PdfService';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    EmailModule,
    UsersModule,
    AuditModule,
    CreditsModule,
    CaptureModule,
    ConfigModule.forRoot({
      isGlobal: true,  // Makes it available everywhere
      envFilePath: '.env'
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: PdfUseCaseToken,
      useClass: PdfService,
    }
  ],
})
export class AppModule { }
