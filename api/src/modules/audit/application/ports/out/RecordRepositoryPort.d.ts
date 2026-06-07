import { Record } from '../../../domain/entities/Record';
export interface RecordRepositoryPort {
    save(record: Record): Promise<void>;
    findByUserId(userId: string): Promise<Record[]>;
    findById(id: string): Promise<Record | null>;
}
export declare const RecordRepositoryPortToken: unique symbol;
