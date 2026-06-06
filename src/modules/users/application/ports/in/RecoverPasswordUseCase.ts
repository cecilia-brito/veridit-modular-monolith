export interface RecoverPasswordUseCase {
  recoverPassword(email: string): Promise<void>;
}

export const RecoverPasswordUseCaseToken = Symbol('RecoverPasswordUseCase');
