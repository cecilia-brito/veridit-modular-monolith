import { ValueObject } from '../../../../shared/domain/value-object.base';
interface PasswordProps {
    value: string;
    isHashed: boolean;
}
export declare class Password extends ValueObject<PasswordProps> {
    private constructor();
    get value(): string;
    static create(value: string): Password;
    static createFromHash(hash: string): Password;
    getHashedValue(): Promise<string>;
    compare(plainText: string): Promise<boolean>;
}
export {};
