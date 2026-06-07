import { RecoverPasswordUseCase } from '../ports/in/RecoverPasswordUseCase';
import { UserRepositoryPort } from '../ports/out/UserRepositoryPort';
import { MailerPort } from '../ports/out/MailerPort';
export declare class RecoverPasswordService implements RecoverPasswordUseCase {
    private readonly userRepository;
    private readonly mailerPort;
    constructor(userRepository: UserRepositoryPort, mailerPort: MailerPort);
    recoverPassword(email: string): Promise<void>;
}
