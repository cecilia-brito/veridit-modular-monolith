export declare abstract class BaseEntity<T> {
    protected readonly _id: string;
    readonly props: T;
    constructor(props: T, id?: string);
    get id(): string;
}
