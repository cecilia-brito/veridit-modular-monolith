import { Record } from '../../../domain/entities/Record';

export interface RecordsUseCase {
  list(userId: string): Promise<Record[]>;
  fetch(recordId: string): Promise<Record>;
  createReport(recordId: string): Promise<{ pdfPath:string, manifestPath:string }>;
}

export const RecordsUseCaseToken = Symbol('RecordsUseCase');
