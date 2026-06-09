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

  // 1. Adicionamos a nova senha como parâmetro (lembre de atualizar a interface RecoverPasswordUseCase também!)
  public async recoverPassword(email: string, newPassword?: string): Promise<{ message: string }> {
    const emailVO = Email.create(email);

    // 2. Busca o usuário no seu banco mocado
    const user = await this.userRepository.findByEmail(emailVO.value);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (newPassword) {
      // Como você está usando DDD, você deve ter um método na entidade User para mudar a senha.
      // Se não tiver o método updatePassword(), você pode simplesmente fazer: user.password = newPassword (se for público)
      user.updatePassword(newPassword); 
      
      // Salva o usuário atualizado de volta no banco (Map mocado)
      await this.userRepository.save(user);
    }

    // 4. Mantemos o seu envio de e-mail falso para manter a arquitetura intacta
    const resetToken = Math.random().toString(36).substring(2, 15);
    const resetUrl = `https://veridit.com/reset-password?token=${resetToken}`;
    const subject = 'Recuperação de Senha - Veridit';
    const body = `Olá, ${user.fullName}. Use este link para resetar sua senha: ${resetUrl}`;
    
    // Dispara pro seu Mailer Mock
    await this.mailerPort.sendEmail(user.email.value, subject, body);

    return { message: 'Senha atualizada e e-mail mockado enviado com sucesso!' };
  }
}