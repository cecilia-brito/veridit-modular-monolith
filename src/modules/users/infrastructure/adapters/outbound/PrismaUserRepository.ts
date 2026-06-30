import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../../application/ports/out/UserRepositoryPort';
import { User } from '../../../domain/entities/User';
import { Email } from '../../../domain/value-objects/Email';
import { Password } from '../../../domain/value-objects/Password';
import { CPF } from '../../../domain/value-objects/CPF';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepositoryPort {
	constructor(private readonly prisma: PrismaService) {}

	public async save(user: User): Promise<void> {
		await this.prisma.user.upsert({
			where: { id: user.id },
			update: {
				fullName: user.fullName,
				email: user.email.value,
				password: user.password.value,
				cpf: user.cpf.value,
				role: user.role,
				oabNumber: user.oabNumber || null,
				isActive: user.isActive,
				resetToken: user.resetToken || null,
			},
			create: {
				id: user.id,
				fullName: user.fullName,
				email: user.email.value,
				password: user.password.value,
				cpf: user.cpf.value,
				role: user.role,
				oabNumber: user.oabNumber || null,
				isActive: user.isActive,
				createdAt: user.createdAt,
				resetToken: user.resetToken || null,
			},
		});
		console.log(`[Repository] Usuário salvo no banco: ${user.fullName} (${user.id})`);
	}
	
	public async findByEmail(email: string): Promise<User | null> {
		const rawData = await this.prisma.user.findUnique({
			where: { email },
		});
		if (!rawData) return null;
		return this.mapToDomain(rawData);
	}
	
	public async findById(id: string): Promise<User | null> {
		const rawData = await this.prisma.user.findUnique({
			where: { id },
		});
		if (!rawData) return null;
		return this.mapToDomain(rawData);
	}
	
	public async findByCpf(cpf: string): Promise<User | null> {
		const rawData = await this.prisma.user.findUnique({
			where: { cpf },
		});
		if (!rawData) return null;
		return this.mapToDomain(rawData);
	}
	
	private mapToDomain(rawData: any): User {
		const user = User.create(
			{
				fullName: rawData.fullName,
				email: Email.create(rawData.email),
				password: Password.createFromHash(rawData.password),
				cpf: CPF.create(rawData.cpf),
				role: rawData.role,
				oabNumber: rawData.oabNumber || undefined,
			},
			rawData.id,
		);
		if (rawData.resetToken) {
			user.setResetToken(rawData.resetToken);
		}
		return user;
	}
}

