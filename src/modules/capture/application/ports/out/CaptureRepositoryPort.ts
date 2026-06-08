import { CaptureSession } from '../../../domain/entities/CaptureSession';

export const CaptureRepositoryPortToken = Symbol('CaptureRepositoryPort');

export interface CaptureRepositoryPort {
  save(session: CaptureSession): Promise<void>;
  findById(id: string): Promise<CaptureSession | null>;
  update(session: CaptureSession): Promise<void>;
}