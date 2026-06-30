import { TextOptionsLight } from 'jspdf';
import { UserOptions } from 'jspdf-autotable';

export interface index {
  Index: string;
  Page: number;
}

export interface TableOptions extends UserOptions {
  ignoreFields?: string[];
  tableName: string;
  addToIndex?: boolean;
}

export interface TextOptions extends TextOptionsLight {
  x?: number;
  y?: number;
  addToIndex?: boolean;
}

export interface PdfManifest {
  filename: string;
  createdAt: string; // Data em formato ISO
  module: string; // Qual parte do sistema gerou (ex: 'Faturamento', 'RH')
  contentType: string;
  sizeBytes: number;
  checksum: string; // Hash SHA-256 para garantir a integridade do arquivo
  customMetadata?: Record<string, any>; // Dados específicos do contexto
}