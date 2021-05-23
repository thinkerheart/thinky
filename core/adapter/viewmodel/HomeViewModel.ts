import { action, computed, observable } from "mobx";
import { DefaultErrorBundle } from "../../domain/exception/DefaultErrorBundle";
import { IErrorBundle } from "../../domain/exception/IErrorBundle";
import { ObservableSubscriber } from "../../domain/usecase/base/ObservableSubscriber";
import { SignOutUseCase } from "../../domain/usecase/SignOutUseCase";
import { BaseViewModel } from "./BaseViewModel";

export class HomeViewModel extends BaseViewModel {
    private signOutUseCase: SignOutUseCase;

    @observable
    private _isSignOut: boolean;

    public constructor(signOutUseCase: SignOutUseCase, defaultErrorBundle: IErrorBundle) {
        super(defaultErrorBundle);
        this._isSignOut = false;
        this.signOutUseCase = signOutUseCase;
    }

    @computed
    get isSignOut(): boolean {
        return this._isSignOut;
    }

    @action
    public setIsSignOut(value: boolean) {
        this._isSignOut = value;
    }

    @action
    public handleSignOut(): void {
        this._isSignOut = true;
    }

    @action
    public signOut() {
        const signOutSubscriber = new SignOutSubscriber();
        signOutSubscriber.homeViewModel = this;
        this.signOutUseCase.execute(signOutSubscriber, null);
    }

    public reinitializeStateValueProperty() {
        this._isSignOut = false;
        this._defaultErrorBundle = new DefaultErrorBundle(new Error());
    }
}

class SignOutSubscriber extends ObservableSubscriber<void> {
    private _homeViewModel: HomeViewModel;

    set homeViewModel(value: HomeViewModel) {
        this._homeViewModel = value;
    }

    public next(value?: void): void {
        super.next(value);
    }

    public complet(): void {
        this._homeViewModel.handleSignOut();
    }

    public error(err?: IErrorBundle): void {
        this._homeViewModel.setDefaultErrorBundle(err);
    }
}