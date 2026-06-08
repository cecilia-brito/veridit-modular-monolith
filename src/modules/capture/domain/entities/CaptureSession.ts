import { v4 as uuidv4 } from 'uuid';

export class CaptureSession {
  public fim?: Date;

  constructor(
    public readonly id: string,
    public readonly titulo: string,
    public readonly siteUrl: string,
    public readonly inicio: Date,
    public status: 'EM_ANDAMENTO' | 'CONCLUIDO' | 'FALHA',
    public readonly userId: string,
  ) {}

  public static create(titulo: string, siteUrl: string, userId: string): CaptureSession {
    return new CaptureSession(uuidv4(), titulo, siteUrl, new Date(), 'EM_ANDAMENTO', userId);
  }

  public finish(): void {
    if (this.status !== 'EM_ANDAMENTO') {
      throw new Error('Apenas capturas em andamento podem ser concluídas.');
    }
    this.status = 'CONCLUIDO';
    this.fim = new Date();
  }
}