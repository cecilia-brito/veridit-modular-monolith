import { ValueObject } from '../../../../shared/domain/value-object.base';
interface CPFProps {
    value: string;
}
export declare class CPF extends ValueObject<CPFProps> {
    private constructor();
    get value(): string;
    static create(value: string): CPF;
    private static isValid;
}
export {};
