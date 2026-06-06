import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUseCase, LoginResult } from '../ports/in/LoginUseCase';
import { LoginCommand } from '../ports/in/dto/LoginCommand';
import { UserRepositoryPort, UserRepositoryPortToken } from '../ports/out/UserRepositoryPort';
import { Email } from '../../domain/value-objects/Email';

@Injectable()
export class LoginService implements LoginUseCase {
  constructor(
    @Inject(UserRepositoryPortToken)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  public async login(command: LoginCommand): Promise<LoginResult> {
    const emailVO = Email.create(command.email);

    // Buscar usuário pelo e-mail
    const user = await this.userRepository.findByEmail(emailVO.value);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Validar a senha
    const isPasswordValid = await user.password.compare(command.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Gerar token mockado de login (conforme escopo básico de esqueleto)
    // Em produção, isso usaria o JwtService do Nest.js
    const mockToken = `mock-jwt-token-for-user-${user.id}`;

    return {
      accessToken: mockToken,
      userId: user.id,
      role: user.role,
    };
  }
}
