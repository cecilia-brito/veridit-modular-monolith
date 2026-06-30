import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUseCase, LoginResult } from '../ports/in/LoginUseCase';
import { LoginCommand } from '../ports/in/dto/LoginCommand';
import { UserRepositoryPort, UserRepositoryPortToken } from '../ports/out/UserRepositoryPort';
import { Email } from '../../domain/value-objects/Email';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoginService implements LoginUseCase {
  constructor(
    @Inject(UserRepositoryPortToken)
    private readonly userRepository: UserRepositoryPort, 
    private readonly jwtService: JwtService
  ) {}

  public async login(command: LoginCommand): Promise<LoginResult> {

    const emailVO = Email.create(command.email);

    const user = await this.userRepository.findByEmail(emailVO.value);
    
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    
    if (!user.isActive) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await user.password.compare(command.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      role: user.role,
      name: user.fullName,
      email: user.email.value,
    });


    return {
      accessToken: token,
      userId: user.id,
      role: user.role,
    };
  }
}