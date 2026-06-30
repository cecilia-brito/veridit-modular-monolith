import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/adapters/inbound/UsersController';
import { RegisterUserUseCaseToken } from './application/ports/in/RegisterUserUseCase';
import { RegisterUserService } from './application/usecases/RegisterUserService';
import { LoginUseCaseToken } from './application/ports/in/LoginUseCase';
import { LoginService } from './application/usecases/LoginService';
import { RecoverPasswordUseCaseToken } from './application/ports/in/RecoverPasswordUseCase';
import { RecoverPasswordService } from './application/usecases/RecoverPasswordService';
import { ResetPasswordUseCaseToken } from './application/ports/in/ResetPasswordUseCase';
import { ResetPasswordService } from './application/usecases/ResetPasswordService';
import { LogoutUseCaseToken } from './application/ports/in/LogoutUseCase';
import { LogoutService } from './application/usecases/LogoutService';
import { UserRepositoryPortToken } from './application/ports/out/UserRepositoryPort';
import { PrismaUserRepository } from './infrastructure/adapters/outbound/PrismaUserRepository';
import { MailerPortToken } from './application/ports/out/MailerPort';
import { MailtrapAdapter } from './infrastructure/adapters/outbound/MailtrapAdapter';
import { AuthModule } from 'src/shared/infrastructure/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [
    {
      provide: RegisterUserUseCaseToken,
      useClass: RegisterUserService,
    },
    {
      provide: LoginUseCaseToken,
      useClass: LoginService,
    },
    {
      provide: RecoverPasswordUseCaseToken,
      useClass: RecoverPasswordService,
    },
    {
      provide: ResetPasswordUseCaseToken,
      useClass: ResetPasswordService,
    },
    {
      provide: LogoutUseCaseToken,
      useClass: LogoutService,
    },
    {
      provide: UserRepositoryPortToken,
      useClass: PrismaUserRepository,
    },
    {
      provide: MailerPortToken,
      useClass: MailtrapAdapter,
    },
  ],
  exports: [
    UserRepositoryPortToken,
  ],
})
export class UsersModule {}

