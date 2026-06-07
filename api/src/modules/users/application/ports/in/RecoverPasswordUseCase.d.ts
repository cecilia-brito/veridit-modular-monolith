export interface RecoverPasswordUseCase {
    recoverPassword(email: string): Promise<void>;
}
export declare const RecoverPasswordUseCaseToken: unique symbol;
