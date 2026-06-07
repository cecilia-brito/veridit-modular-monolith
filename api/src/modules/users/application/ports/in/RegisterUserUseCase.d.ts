import { UserRole } from '../../../domain/entities/User';
export interface RegisterUserCommand {
    fullName: string;
    email: string;
    password: string;
    cpf: string;
    role: UserRole;
    oabNumber?: string;
}
export interface RegisterUserUseCase {
    registerUser(command: RegisterUserCommand): Promise<string>;
}
export declare const RegisterUserUseCaseToken: unique symbol;
