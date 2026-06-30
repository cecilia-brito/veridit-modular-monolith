import { Injectable } from '@nestjs/common';
import { jsPDF } from 'jspdf';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { TableOptions, TextOptions, index, PdfManifest } from '../../../pdf.interface';
import { PdfUseCase } from '../ports/in/PdfUseCase';

@Injectable()
export class PdfService implements PdfUseCase {
  private doc: jsPDF;
  private filePath;
  private manifestPath;
  private readonly xMargin = 20;
  private readonly yMargin = 30;
  private indexData: index[] = [];
  private x: number;
  private y: number;

  constructor() {
    this.doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
    this.resetXandY();
    this.updatePointer();
  }

  private resetXandY() {
    this.x = this.xMargin;
    this.y = this.yMargin;
  }

  private updatePointer() {
    this.doc.moveTo(this.x, this.y);
  }

  async addNewPage() {
    this.doc.addPage();
    this.resetXandY();
    this.updatePointer();
  }

  async addText(text: string, options?: TextOptions) {
    const lines = this.doc.splitTextToSize(
      text,
      this.doc.internal.pageSize.width - this.xMargin * 2,
    );

    if (options?.addToIndex) {
      this.indexData.push({
        Index: text,
        Page: this.doc.getCurrentPageInfo().pageNumber,
      });
    }

    this.doc.text(lines, options?.x ?? this.x, options?.y ?? this.y);

    const textHeight = this.doc.getTextDimensions(lines).h;
    this.y = this.y + textHeight + this.doc.getLineHeight();
    this.updatePointer();
  }

  async addNewLine() {
    this.y += this.doc.getLineHeight();
    this.x = this.xMargin;
    this.updatePointer();
  }

  setFilename(name: string) {
    this.filePath = `./public/reports/${name}.pdf`;
    this.manifestPath = `./public/reports/${name}-manifest.json`;
  }

  getPdfPath(): string {
    return this.filePath;
  }
  getManifestPath(): string {
    return this.manifestPath;
  }

  async render(module: string): Promise<{ pdfPath: string; manifestPath: string; manifest: PdfManifest }> {
    await this.addPageNumbers();
    await this.index();

    return new Promise((resolve) => {
      this.doc.save(this.filePath);

      const arrayBuffer = this.doc.output('arraybuffer');
      const pdfBuffer = Buffer.from(arrayBuffer);

      const manifest = this.generateManifest(pdfBuffer, module);
      fs.writeFileSync(this.manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

      resolve({
        pdfPath: this.filePath,
        manifestPath: this.manifestPath,
        manifest,
      });
    });
  }

  private generateManifest(buffer: Buffer, module: string): PdfManifest {
    // Gera o Hash SHA-256 para garantir a integridade do arquivo gerado
    const checksum = crypto.createHash('sha256').update(buffer).digest('hex');

    return {
      filename: this.filePath.replace('./', ''),
      createdAt: new Date().toISOString(),
      contentType: 'application/pdf',
      sizeBytes: buffer.length,
      module,
      checksum,
    };
  }

  private async addPageNumbers() {
    const pageCount = (this.doc as any).internal.getNumberOfPages();
    for (let i = 0; i < pageCount; i++) {
      this.doc.setPage(i);
      const pageCurrent = (this.doc as any).internal.getCurrentPageInfo().pageNumber;
      this.doc.setFontSize(12);
      this.doc.text(
        'page: ' + pageCurrent + '/' + pageCount,
        this.xMargin,
        this.doc.internal.pageSize.height - this.yMargin / 2,
      );
    }
  }

  private async index() {
    this.doc.setPage(2);
    this.resetXandY();
    this.updatePointer();
  }
}