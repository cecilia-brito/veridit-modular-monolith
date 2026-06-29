import { Record } from '../../../domain/entities/Record';

export interface RecordsUseCase {
  list(userId: string): Promise<Record[]>;
  fetch(recordId: string): Promise<Record>;
}

export const RecordsUseCaseToken = Symbol('ListRecordsUseCase');
