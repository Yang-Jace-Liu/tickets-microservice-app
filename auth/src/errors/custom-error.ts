export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor() {
        super();
        Object.setPrototypeOf(this, new.target.prototype);
    }

    abstract serializeErrors(): { message: string; field?: string }[]
}
