import { ListRecordsUseCase } from '../ports/in/ListRecordsUseCase';
import { Record } from '../../domain/entities/Record';
import { RecordRepositoryPort } from '../ports/out/RecordRepositoryPort';
export declare class ListRecordsService implements ListRecordsUseCase {
    private readonly recordRepository;
    constructor(recordRepository: RecordRepositoryPort);
    execute(userId: string): Promise<Record[]>;
}
