import { RecordRepositoryPort } from '../../../application/ports/out/RecordRepositoryPort';
import { Record } from '../../../domain/entities/Record';
export declare class PrismaRecordRepository implements RecordRepositoryPort {
    private readonly recordsDb;
    constructor();
    save(record: Record): Promise<void>;
    findByUserId(userId: string): Promise<Record[]>;
    findById(id: string): Promise<Record | null>;
    private mapToDomain;
}
