import {CustomError} from "./custom-error";

export class BadRequestError extends CustomError {
    statusCode: number = 400;

    constructor(private msg: string) {
        super();
        Object.setPrototypeOf(this, new.target.prototype);
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{message: this.msg}];
    }

}
