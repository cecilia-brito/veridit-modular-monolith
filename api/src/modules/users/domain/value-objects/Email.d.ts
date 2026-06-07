import { ValueObject } from '../../../../shared/domain/value-object.base';
interface EmailProps {
    value: string;
}
export declare class Email extends ValueObject<EmailProps> {
    private constructor();
    get value(): string;
    static create(value: string): Email;
    private static isValid;
}
export {};
