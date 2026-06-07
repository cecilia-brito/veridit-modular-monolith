import { Record } from '../../../domain/entities/Record';
export interface ListRecordsUseCase {
    execute(userId: string): Promise<Record[]>;
}
export declare const ListRecordsUseCaseToken: unique symbol;
