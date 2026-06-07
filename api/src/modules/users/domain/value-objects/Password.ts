import { ValueObject } from '../../../../shared/domain/value-object.base';
import * as bcrypt from 'bcrypt';

interface PasswordProps {
  value: string;
  isHashed: boolean;
}

export class Password extends ValueObject<PasswordProps> {
  private constructor(props: PasswordProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(value: string): Password {
    if (value.length < 8) {
      throw new Error('A senha deve ter no mínimo 8 caracteres');
    }
    return new Password({ value, isHashed: false });
  }

  public static createFromHash(hash: string): Password {
    return new Password({ value: hash, isHashed: true });
  }

  public async getHashedValue(): Promise<string> {
    if (this.props.isHashed) {
      return this.props.value;
    }
    return bcrypt.hash(this.props.value, 10);
  }

  public async compare(plainText: string): Promise<boolean> {
    if (!this.props.isHashed) {
      return this.props.value === plainText;
    }
    return bcrypt.compare(plainText, this.props.value);
  }
}
