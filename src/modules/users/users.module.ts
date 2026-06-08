import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/adapters/inbound/UsersController';
import { RegisterUserUseCaseToken } from './application/ports/in/RegisterUserUseCase';
import { RegisterUserService } from './application/usecases/RegisterUserService';
import { LoginUseCaseToken } from './application/ports/in/LoginUseCase';
import { LoginService } from './application/usecases/LoginService';
import { RecoverPasswordUseCaseToken } from './application/ports/in/RecoverPasswordUseCase';
import { RecoverPasswordService } from './application/usecases/RecoverPasswordService';
import { LogoutUseCaseToken } from './application/ports/in/LogoutUseCase';
import { LogoutService } from './application/usecases/LogoutService';
import { UserRepositoryPortToken } from './application/ports/out/UserRepositoryPort';
import { PrismaUserRepository } from './infrastructure/adapters/outbound/PrismaUserRepository';
import { MailerPortToken } from './application/ports/out/MailerPort';
import { NestMailerAdapter } from './infrastructure/adapters/outbound/NestMailerAdapter';
import { AuthModule } from 'src/shared/infrastructure/auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule],
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
      provide: LogoutUseCaseToken,
      useClass: LogoutService,
    },
    {
      provide: UserRepositoryPortToken,
      useClass: PrismaUserRepository,
    },
    {
      provide: MailerPortToken,
      useClass: NestMailerAdapter,
    },
  ],
  exports: [
    UserRepositoryPortToken,
  ],
})
export class UsersModule {}
