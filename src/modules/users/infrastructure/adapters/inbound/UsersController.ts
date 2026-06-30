import { Controller, Post, Body, Inject, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { RegisterUserUseCase, RegisterUserUseCaseToken, RegisterUserCommand } from '../../../application/ports/in/RegisterUserUseCase';
import { LoginUseCase, LoginUseCaseToken } from '../../../application/ports/in/LoginUseCase';
import { RecoverPasswordUseCase, RecoverPasswordUseCaseToken } from '../../../application/ports/in/RecoverPasswordUseCase';
import { LogoutUseCase, LogoutUseCaseToken } from '../../../application/ports/in/LogoutUseCase';
import { LoginCommand } from '../../../application/ports/in/dto/LoginCommand';
import { RecoverPasswordService } from 'src/modules/users/application/usecases/RecoverPasswordService';
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
  ) { }

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

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @Post('recover-password')
  public async recoverPassword(@Body() body: { email: string }) {
    const result = await this.recoverPasswordUseCase.recoverPassword(body.email);
    return result;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(@Body('userId') userId: string) {
    await this.logoutUseCase.logout(userId);
    return { message: 'Logout realizado com sucesso' };
  }
}
