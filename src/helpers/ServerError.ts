export default class ServerError extends Error {
    private _statusCode: number;

    constructor(message: string, statusCode = 422) {
        super(message);
        this._statusCode = statusCode;
    }

    get statusCode(): number {
        return this._statusCode;
    }

    set statusCode(statusCode: number) {
        this._statusCode = statusCode;
    }
}
