export interface Response {
    error: boolean;
    resultMessage: string;
}

export interface ResponseGeneric<T> extends Response {
    value: T;
}