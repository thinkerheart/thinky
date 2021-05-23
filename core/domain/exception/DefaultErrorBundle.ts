import { computed, observable } from "mobx";
import { IErrorBundle } from "./IErrorBundle";

export class DefaultErrorBundle implements IErrorBundle {

    private static DEFAULT_ERROR_MSG: string = "Unknown error";

    @observable
    private readonly _error: Error;

    public constructor(error: Error) {
        this._error = error;
    }

    @computed
    get error(): Error {
        return this.error;
    }

    public getError(): Error {
        return this._error;
    }
    
    public getErrorMessage(): string {
        return this._error != null ? this._error.message : DefaultErrorBundle.DEFAULT_ERROR_MSG;
    }
    
}