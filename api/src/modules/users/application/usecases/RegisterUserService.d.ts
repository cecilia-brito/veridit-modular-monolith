import { RegisterUserUseCase, RegisterUserCommand } from '../ports/in/RegisterUserUseCase';
import { UserRepositoryPort } from '../ports/out/UserRepositoryPort';
export declare class RegisterUserService implements RegisterUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepositoryPort);
    registerUser(command: RegisterUserCommand): Promise<string>;
}
