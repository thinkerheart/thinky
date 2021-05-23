import { action, computed, observable } from "mobx";
import { UserAccount } from "../../domain/entity/UserAccount";
import { DefaultErrorBundle } from "../../domain/exception/DefaultErrorBundle";
import { IErrorBundle } from "../../domain/exception/IErrorBundle";
import { ObservableSubscriber } from "../../domain/usecase/base/ObservableSubscriber";
import { Ps, SignUpUseCase } from "../../domain/usecase/SignUpUseCase";
import { UserAccountUIModelMapper } from "../mapper/UserAccountUIModelMapper";
import { UserAccountUIModel } from "../model/UserAccountUIModel";
import { BaseViewModel } from "./BaseViewModel";

export class SignUpViewModel extends BaseViewModel {

    @observable
    private _userName: string;

    @observable
    private _password: string;

    @observable
    private _firstName: string;

    @observable
    private _lastName: string;

    @observable
    private _signedUpUser: UserAccountUIModel;

    private signUpUseCase: SignUpUseCase;

    private userAccountUIModelMapper: UserAccountUIModelMapper;

    public constructor(
        signUpUseCase: SignUpUseCase, 
        userAccountUIModelMapper: UserAccountUIModelMapper,
        defaultErrorbundle: IErrorBundle, 
        signedUpUser: UserAccountUIModel
    ) {
            super(defaultErrorbundle);
            this._userName = "";
            this._password = "";
            this._firstName = "";
            this._lastName = "";
            this._signedUpUser = signedUpUser;
            this.signUpUseCase = signUpUseCase;
            this.userAccountUIModelMapper = userAccountUIModelMapper;
    }
    public reinitializeStateValueProperty() {
        this._userName = "";
            this._password = "";
            this._firstName = "";
            this._lastName = "";
            this._signedUpUser = new UserAccountUIModel();
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
    get firstName(): string {
        return this._firstName;
    }
    @action
    public setFirstName(value: string) {
        this._firstName = value;
    }

    @computed
    get lastName(): string {
        return this._lastName;
    }
    @action
    public setLastName(value: string) {
        this._lastName = value;
    }

    @computed
    get signedUpUser(): UserAccountUIModel {
        return this._signedUpUser;
    }

    @action
    public setSignedUpUser(value: UserAccountUIModel) {
        return this._signedUpUser = value;
    }

    @action
    public signUp() {
        const signUpSubscriber = new SignUpSubscriber();
        signUpSubscriber.signUpViewModel = this;
        this.signUpUseCase.execute(
            signUpSubscriber, 
            Ps.forPs(this._userName, this._password, this._firstName, this._lastName)
        );
    }

    @action
    public handleSignedUpUser(signedUpUser: UserAccount) {
        this._signedUpUser = this.userAccountUIModelMapper.transformUserAccount(signedUpUser);
    }

}

class SignUpSubscriber extends ObservableSubscriber<UserAccount> {

    private _signUpViewModel: SignUpViewModel;

    set signUpViewModel(value: SignUpViewModel) {
        this._signUpViewModel = value;
    }

    public next(value?: UserAccount): void {
        this._signUpViewModel.handleSignedUpUser(value);
    }

    public error(err?: IErrorBundle): void {
        this._signUpViewModel.setDefaultErrorBundle(err);
    }

    public complete(): void {
        super.complete();
    }
}