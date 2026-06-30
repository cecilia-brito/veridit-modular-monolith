import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Deve ser exatamente a mesma secret da Strategy
        signOptions: { expiresIn: '1d' }, // Token expira em 1 dia
      }),
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtModule], // Exportamos para que o LoginService possa assinar o token
})
export class AuthModule { }