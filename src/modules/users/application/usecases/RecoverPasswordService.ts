import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RecoverPasswordUseCase } from '../ports/in/RecoverPasswordUseCase';
import { UserRepositoryPort, UserRepositoryPortToken } from '../ports/out/UserRepositoryPort';
import { MailerPort, MailerPortToken } from '../ports/out/MailerPort';
import { Email } from '../../domain/value-objects/Email';

@Injectable()
export class RecoverPasswordService implements RecoverPasswordUseCase {
  constructor(
    @Inject(UserRepositoryPortToken)
    private readonly userRepository: UserRepositoryPort,
    @Inject(MailerPortToken)
    private readonly mailerPort: MailerPort,
  ) {}

  public async recoverPassword(email: string): Promise<void> {
    const emailVO = Email.create(email);

    const user = await this.userRepository.findByEmail(emailVO.value);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const resetToken = Math.random().toString(36).substring(2, 15);
    const resetUrl = `https://veridit.com/reset-password?token=${resetToken}`;

    const subject = 'Recuperação de Senha - Veridit';
    const body = `Olá, ${user.fullName}. Use este link para resetar sua senha: ${resetUrl}`;

    await this.mailerPort.sendEmail(user.email.value, subject, body);
  }
}
