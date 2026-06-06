import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuditModule } from './modules/audit/audit.module';
import { CreditsModule } from './modules/credits/credits.module';
import { CaptureModule } from './modules/capture/capture.module';

@Module({
  imports: [
    UsersModule,
    AuditModule,
    CreditsModule,
    CaptureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
