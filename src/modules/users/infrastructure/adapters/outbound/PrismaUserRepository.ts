import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../../application/ports/out/UserRepositoryPort';
import { User } from '../../../domain/entities/User';
import { Email } from '../../../domain/value-objects/Email';
import { Password } from '../../../domain/value-objects/Password';
import { CPF } from '../../../domain/value-objects/CPF';
import { PrismaService } from 'src/modules/prisma/prisma.service';
@Injectable()
export class PrismaUserRepository implements UserRepositoryPort {
	constructor(private readonly prisma: PrismaService){

	}
	// Simulando banco de dados em memória para o esqueleto.
	// Em produção, seria injetado o PrismaService e executado prisma.user.*
	private readonly usersDb = new Map<string, any>();
	//cria o usuário no sqlite
	public async save(user: User): Promise<void> {
		
		const rawData = {
			id: user.id,
			fullName: user.fullName,
			email: user.email.value,
			password: user.password.value, // Armazena a senha já hasheada
			cpf: user.cpf.value,
			role: user.role,
			oabNumber: user.oabNumber,
			isActive: user.isActive,
			createdAt: user.createdAt,
		};
		this.usersDb.set(user.id, rawData);
		console.log(`[Repository] Usuário salvo no banco: ${user.fullName} (${user.id})`);
	}
	
	public async findByEmail(email: string): Promise<User | null> {
		for (const rawData of this.usersDb.values()) {
			if (rawData.email === email) {
				return this.mapToDomain(rawData);
			}
		}
		return null;
	}
	
	public async findById(id: string): Promise<User | null> {
		const rawData = this.usersDb.get(id);
		if (!rawData) return null;
		return this.mapToDomain(rawData);
	}
	
	public async findByCpf(cpf: string): Promise<User | null> {
		for (const rawData of this.usersDb.values()) {
			if (rawData.cpf === cpf) {
				return this.mapToDomain(rawData);
			}
		}
		return null;
	}
	
	private mapToDomain(rawData: any): User {
		return User.create(
			{
				fullName: rawData.fullName,
				email: Email.create(rawData.email),
				password: Password.createFromHash(rawData.password),
				cpf: CPF.create(rawData.cpf),
				role: rawData.role,
				oabNumber: rawData.oabNumber,
			},
			rawData.id,
		);
	}
}
