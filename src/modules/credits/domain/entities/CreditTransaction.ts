import { v4 as uuidv4 } from 'uuid'; // Única biblioteca utilitária permitida para gerar IDs públicos

export type TransactionStatus = 'PENDENTE' | 'PAGO' | 'FALHOU';
export type PaymentMethod = 'Pix' | 'Mercado Pago';

export interface CreditTransactionProps {
  id?: string;
  userId: string;
  pacoteNome: string;
  valorTotal: number;
  metodoPagamento: PaymentMethod;
  status?: TransactionStatus;
  dataCriacao?: Date;
  dataAtualizacao?: Date;
}

export class CreditTransaction {
  // Usamos atributos privados com 'readonly' para garantir o encapsulamento.
  // Ninguém fora desta classe pode alterar estes dados diretamente sem passar pelas regras de negócio.
  private readonly _id: string;
  private readonly _userId: string;
  private readonly _pacoteNome: string;
  private readonly _valorTotal: number;
  private readonly _metodoPagamento: PaymentMethod;
  private _status: TransactionStatus;
  private readonly _dataCriacao: Date;
  private _dataAtualizacao: Date;

  // O construtor é privado. Forçamos a criação da entidade através do método estático 'create'.
  private constructor(props: CreditTransactionProps) {
    this._id = props.id || uuidv4();
    this._userId = props.userId;
    this._pacoteNome = props.pacoteNome;
    this._valorTotal = props.valorTotal;
    this._metodoPagamento = props.metodoPagamento;
    this._status = props.status || 'PENDENTE';
    this._dataCriacao = props.dataCriacao || new Date();
    this._dataAtualizacao = props.dataAtualizacao || new Date();
  }

  // Fabrica da Entidade (Factory Method)
  // É aqui que blindamos o sistema contra dados de transação inconsistentes
  public static create(props: CreditTransactionProps): CreditTransaction {
    if (!props.userId) {
      throw new Error('Uma transação de crédito precisa obrigatoriamente de um utilizador vinculado.');
    }
    
    if (props.valorTotal <= 0) {
      throw new Error('O valor total da transação de créditos deve ser maior que zero.');
    }

    return new CreditTransaction(props);
  }

  // GETTERS: Permitem que as outras camadas (como o UseCase e o Prisma Adapter) leiam os dados
  public get id(): string { return this._id; }
  public get userId(): string { return this._userId; }
  public get pacoteNome(): string { return this._pacoteNome; }
  public get valorTotal(): number { return this._valorTotal; }
  public get metodoPagamento(): PaymentMethod { return this._metodoPagamento; }
  public get status(): TransactionStatus { return this._status; }
  public get dataCriacao(): Date { return this._dataCriacao; }
  public get dataAtualizacao(): Date { return this._dataAtualizacao; }

  // REGRAS DE NEGÓCIO DE MUTAÇÃO DE ESTADO
  // Em DDD, nós não usamos "setters" burros. Criamos métodos com significado semântico real.
  
  public confirmarPagamento(): void {
    // Regra de Negócio: Só podemos aprovar um pagamento que está atualmente pendente
    if (this._status !== 'PENDENTE') {
      throw new Error(`Não é possível confirmar o pagamento de uma transação que está com o estado: ${this._status}`);
    }
    
    this._status = 'PAGO';
    this._dataAtualizacao = new Date();
  }

  public recusarTransacao(): void {
    if (this._status !== 'PENDENTE') {
      throw new Error(`Não é possível falhar uma transação que já foi processada anteriormente. Estado: ${this._status}`);
    }

    this._status = 'FALHOU';
    this._dataAtualizacao = new Date();
  }
}