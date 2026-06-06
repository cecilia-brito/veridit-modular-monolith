import { LoginCommand } from './dto/LoginCommand';

export interface LoginResult {
  accessToken: string;
  userId: string;
  role: string;
}

export interface LoginUseCase {
  login(command: LoginCommand): Promise<LoginResult>;
}

export const LoginUseCaseToken = Symbol('LoginUseCase');
