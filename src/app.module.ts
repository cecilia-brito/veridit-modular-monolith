import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from './modules/users/users.module';
import { AuditModule } from './modules/audit/audit.module';
import { CreditsModule } from './modules/credits/credits.module';
import { CaptureModule } from './modules/capture/capture.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
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
  providers: [],
})
export class AppModule { }
