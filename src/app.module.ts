import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from './modules/users/users.module';
import { AuditModule } from './modules/audit/audit.module';
import { CreditsModule } from './modules/credits/credits.module';
import { CaptureModule } from './modules/capture/capture.module';
import { EmailModule } from './shared/infrastructure/email/email.module';


@Module({
  imports: [
    EventEmitterModule.forRoot(),
    EmailModule,
    UsersModule,
    AuditModule,
    CreditsModule,
    CaptureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
