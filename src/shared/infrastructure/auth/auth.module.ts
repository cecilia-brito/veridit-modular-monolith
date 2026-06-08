import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'VERIDIT_SUPER_SECRET_KEY_2026', // Deve ser exatamente a mesma secret da Strategy
      signOptions: { expiresIn: '1d' }, // Token expira em 1 dia
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtModule], // Exportamos para que o LoginService possa assinar o token
})
export class AuthModule {}