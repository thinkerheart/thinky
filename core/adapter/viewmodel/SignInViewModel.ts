import { action, computed, observable } from "mobx";
import { UserAccount } from "../../domain/entity/UserAccount";
import { DefaultErrorBundle } from "../../domain/exception/DefaultErrorBundle";
import { IErrorBundle } from "../../domain/exception/IErrorBundle";
import { ObservableSubscriber } from "../../domain/usecase/base/ObservableSubscriber";
import { Ps, SignInUseCase } from "../../domain/usecase/SignInUseCase";
import { UserAccountUIModelMapper } from "../mapper/UserAccountUIModelMapper";
import { UserAccountUIModel } from "../model/UserAccountUIModel";
import { BaseViewModel } from "./BaseViewModel";

export class SignInViewModel extends BaseViewModel {
    @observable
    private _userName: string;

    @observable
    private _password: string;

    @observable
    private _signedInUser: UserAccountUIModel;

    private signInUseCase: SignInUseCase;

    private userAccountUIModelMapper: UserAccountUIModelMapper;

    public constructor(
        signInUseCase: SignInUseCase, 
        userAccountUIModelMapper: UserAccountUIModelMapper,
        defaultErrorbundle: IErrorBundle, 
        signedInUser: UserAccountUIModel
    ) {
            super(defaultErrorbundle);
            this._userName = "";
            this._password = "";
            this._signedInUser = signedInUser;
            this.signInUseCase = signInUseCase;
            this.userAccountUIModelMapper = userAccountUIModelMapper;
    }
    public reinitializeStateValueProperty() {
        this._userName = "";
            this._password = "";
            this._signedInUser = new UserAccountUIModel();
            this._defaultErrorBundle = new DefaultErrorBundle(new Error());
    }
    
    @computed
    get userName(): string {
        return this._userName;
    }
    @action
    public setUserName(value: string) {
        this._userName = value;
    }

    @computed
    get password(): string {
        return this._password;
    }
    @action
    public setPassword(value: string) {
        this._password = value;
    }

    @computed
    get signedInUser(): UserAccountUIModel {
        return this._signedInUser;
    }

    @action
    public setSignedInUser(value: UserAccountUIModel) {
        return this._signedInUser = value;
    }

    @action
    public signIn() {
        const signInSubscriber = new SignInSubscriber();
        signInSubscriber.signInViewModel = this;
        this.signInUseCase.execute(
            signInSubscriber, 
            Ps.forPs(this._userName, this._password)
        );
    }

    @action
    public handleSignedInUser(signedInUser: UserAccount) {
        this._signedInUser = this.userAccountUIModelMapper.transformUserAccount(signedInUser);
    }

}

class SignInSubscriber extends ObservableSubscriber<UserAccount> {

    private _signInViewModel: SignInViewModel;

    set signInViewModel(value: SignInViewModel) {
        this._signInViewModel = value;
    }

    public next(value?: UserAccount): void {
        this._signInViewModel.handleSignedInUser(value);
    }

    public error(err?: IErrorBundle): void {
        this._signInViewModel.setDefaultErrorBundle(err);
    }

    public complete(): void {
        super.complete();
    }
}