import {CustomError} from "./custom-error";

export class DatabaseConnectionError extends CustomError{
    reason = "Error connecting to database";
    statusCode = 500;

    constructor() {
        super();
        Object.setPrototypeOf(this, new.target.prototype);
    }

    serializeErrors = () => {
        return [{message: this.reason}];
    }
}
