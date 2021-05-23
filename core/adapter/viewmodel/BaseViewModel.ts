import { action, computed, observable } from "mobx";
import { IErrorBundle } from "../../domain/exception/IErrorBundle";

export abstract class BaseViewModel {

    @observable
    protected _defaultErrorBundle: IErrorBundle;

    protected constructor(defaultErrorBundle: IErrorBundle) {
        this._defaultErrorBundle = defaultErrorBundle;
    }

    @computed
    get defaultErrorBundle(): IErrorBundle {
        return this._defaultErrorBundle;
    }

    @action
    public setDefaultErrorBundle(value: IErrorBundle) {
        this._defaultErrorBundle = value;
    }

    public abstract reinitializeStateValueProperty();
}