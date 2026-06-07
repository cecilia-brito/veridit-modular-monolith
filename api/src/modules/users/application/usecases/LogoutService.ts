import { Injectable } from '@nestjs/common';
import { LogoutUseCase } from '../ports/in/LogoutUseCase';

@Injectable()
export class LogoutService implements LogoutUseCase {
  public async logout(userId: string): Promise<void> {
    // No login mock/JWT sem estado (stateless), o logout client-side é suficiente.
    // Mas se houver blacklist de tokens ou sessões ativas no redis/banco,
    // revogaríamos aqui usando portas de saída correspondentes.
    console.log(`User ${userId} logged out successfully.`);
  }
}
