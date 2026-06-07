import { UserRepositoryPort } from '../../../application/ports/out/UserRepositoryPort';
import { User } from '../../../domain/entities/User';
export declare class PrismaUserRepository implements UserRepositoryPort {
    private readonly usersDb;
    save(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findByCpf(cpf: string): Promise<User | null>;
    private mapToDomain;
}
