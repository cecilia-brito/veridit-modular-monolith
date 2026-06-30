import { Inject, Injectable } from '@nestjs/common';
import { RecordsUseCase } from '../ports/in/RecordsUseCase';
import { Record } from '../../domain/entities/Record';
import { RecordRepositoryPort, RecordRepositoryPortToken } from '../ports/out/RecordRepositoryPort';
import { PdfUseCaseToken, PdfUseCase } from '../../../../shared/application/ports/in/PdfUseCase';
import { UserRepositoryPort, UserRepositoryPortToken } from '../../../users/application/ports/out/UserRepositoryPort';
import { existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';
@Injectable()
export class RecordsService implements RecordsUseCase {
  constructor(
    @Inject(RecordRepositoryPortToken)
    private readonly recordRepository: RecordRepositoryPort,
    @Inject(PdfUseCaseToken)
    private readonly pdfUseCase: PdfUseCase,
    @Inject(UserRepositoryPortToken)
    private readonly userRepository: UserRepositoryPort
  ) { }

  public async list(userId: string): Promise<Record[]> {
    return this.recordRepository.findByUserId(userId);
  }

  public async fetch(recordId: string): Promise<Record> {
    return this.recordRepository.findById(recordId);
  }

  async createReport(recordId: string): Promise<{ pdfPath: string, manifestPath: string }> {
    const record = await this.fetch(recordId);
    this.pdfUseCase.setFilename(record.id);

    const pdfPath = this.pdfUseCase.getPdfPath();
    const manifestPath = this.pdfUseCase.getManifestPath();

    if (existsSync(pdfPath) && existsSync(manifestPath)) {
      return { pdfPath, manifestPath };
    }

    mkdirSync(dirname(pdfPath), { recursive: true });

    await Promise.all([
      (async () => {
        await this.pdfUseCase.addText(`Relatório de registro`, { align: 'center' });
        return this.pdfUseCase.addText(`ID: ${record.id}   Título: ${record.title}`, { align: 'center' });
      })(),
      this.userRepository.findById(record.userId)
    ]).then(async ([, user]) => {

      await this.pdfUseCase.addNewLine();
      await this.pdfUseCase.addText(`Usuário: ${user?.fullName}   CPF: ${user?.cpf}`, { align: 'center' });
    });

    await this.pdfUseCase.addNewLine();
    await this.pdfUseCase.addText(`Data hora:`)
    await this.pdfUseCase.addText(`Início: ${record.startTime.toLocaleString('pt-BR')}    Fim: ${record.endTime.toLocaleString('pt-BR')}`,
      { align: 'center' });

    await this.pdfUseCase.addNewLine();
    await this.pdfUseCase.addText(`Capturas:`, { maxWidth: 17 })
    await this.pdfUseCase.addText(`Imagens: ${record.imageCount}    Vídeos: ${record.videoCount}`, { align: 'center', maxWidth: 23 });
    await this.pdfUseCase.addText(`Origem das mídias: ${record.siteUrl}`);


    await this.pdfUseCase.addNewLine();
    await this.pdfUseCase.addText(`Arquivo gerado:`, { maxWidth: 15 })
    await this.pdfUseCase.addText(`Nome: evidencia_VRD-98273.mp4    Tamanho: 145 MB`, { align: 'center' });

    const { pdfPath: generatedPdfPath, manifestPath: generatedManifestPath } = await this.pdfUseCase.render('audit');
    return { pdfPath: generatedPdfPath, manifestPath: generatedManifestPath };
  }

}
