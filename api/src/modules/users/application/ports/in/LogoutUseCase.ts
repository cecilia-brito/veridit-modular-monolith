export interface LogoutUseCase {
  logout(userId: string): Promise<void>;
}

export const LogoutUseCaseToken = Symbol('LogoutUseCase');
