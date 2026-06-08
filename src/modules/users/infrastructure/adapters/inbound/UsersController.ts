import { Controller, Post, Body, Inject, HttpCode, HttpStatus } from '@nestjs/common';
import { RegisterUserUseCase, RegisterUserUseCaseToken, RegisterUserCommand } from '../../../application/ports/in/RegisterUserUseCase';
import { LoginUseCase, LoginUseCaseToken } from '../../../application/ports/in/LoginUseCase';
import { RecoverPasswordUseCase, RecoverPasswordUseCaseToken } from '../../../application/ports/in/RecoverPasswordUseCase';
import { LogoutUseCase, LogoutUseCaseToken } from '../../../application/ports/in/LogoutUseCase';
import { LoginCommand } from '../../../application/ports/in/dto/LoginCommand';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(RegisterUserUseCaseToken)
    private readonly registerUserUseCase: RegisterUserUseCase,

    @Inject(LoginUseCaseToken)
    private readonly loginUseCase: LoginUseCase,

    @Inject(RecoverPasswordUseCaseToken)
    private readonly recoverPasswordUseCase: RecoverPasswordUseCase,

    @Inject(LogoutUseCaseToken)
    private readonly logoutUseCase: LogoutUseCase,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() body: RegisterUserCommand) {
    const userId = await this.registerUserUseCase.registerUser(body);
    return { id: userId, message: 'Usuário cadastrado com sucesso' };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() body: LoginCommand) {
    const result = await this.loginUseCase.login(body);
    return result;
  }

  @Post('recover-password')
  @HttpCode(HttpStatus.OK)
  public async recoverPassword(@Body('email') email: string) {
    await this.recoverPasswordUseCase.recoverPassword(email);
    return { message: 'Se o e-mail existir, um link de recuperação foi enviado' };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(@Body('userId') userId: string) {
    await this.logoutUseCase.logout(userId);
    return { message: 'Logout realizado com sucesso' };
  }
}
