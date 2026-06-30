import { PdfManifest, TextOptions } from '../../../../pdf.interface';


export interface PdfUseCase {
  addNewPage(): Promise<void>;
  addText(text: string, options?: TextOptions): Promise<void>;
  addNewLine(): Promise<void>;
  setFilename(filename: string): void;
  getPdfPath(): string;
  getManifestPath(): string;
  render(module: string): Promise<{ pdfPath: string; manifestPath: string; manifest: PdfManifest }>;
}

export const PdfUseCaseToken = Symbol('PdfsUseCase');