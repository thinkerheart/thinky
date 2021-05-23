import { action, computed, observable } from "mobx";
import { UserAccount } from "../../domain/entity/UserAccount";
import { DefaultErrorBundle } from "../../domain/exception/DefaultErrorBundle";
import { IErrorBundle } from "../../domain/exception/IErrorBundle";
import { ObservableSubscriber } from "../../domain/usecase/base/ObservableSubscriber";
import { GetCurrentUserUseCase } from "../../domain/usecase/GetCurrentUserUseCase";
import { UserAccountUIModelMapper } from "../mapper/UserAccountUIModelMapper";
import { UserAccountUIModel } from "../model/UserAccountUIModel";
import { BaseViewModel } from "./BaseViewModel";

export class IntroductionViewModel extends BaseViewModel {

    @observable
    private _currentUser: UserAccountUIModel;

    private getCurrentUserUseCase: GetCurrentUserUseCase;
    private userAccountUIMapper: UserAccountUIModelMapper;

    public constructor(
        getCurrentUserUseCase: GetCurrentUserUseCase, 
        userAccountUIMapper: UserAccountUIModelMapper,
        defaultErrorBundle: DefaultErrorBundle, 
        currentUser: UserAccountUIModel) {
            super(defaultErrorBundle);
            this.getCurrentUserUseCase = getCurrentUserUseCase;
            this.userAccountUIMapper = userAccountUIMapper;
            this._currentUser = currentUser;
    }

    @computed
    get currentUser(): UserAccountUIModel {
        return this._currentUser;
    }

    @action
    public setCurrentUser(value: UserAccountUIModel) {
        this._currentUser = value;
    }

    @action
    public handleCurrentUser(currentUser: UserAccount) {
        this._currentUser = this.userAccountUIMapper.transformUserAccount(currentUser);
    }

    @action
    public checkCurrentUser() {
        const getCurrentUserSubscriber = new GetCurrentUserSubscriber();
        getCurrentUserSubscriber.introductionViewModel = this;
        this.getCurrentUserUseCase.execute(getCurrentUserSubscriber, null);
    }

    public reinitializeStateValueProperty() {
        this._currentUser = new UserAccountUIModel();
        this._defaultErrorBundle = new DefaultErrorBundle(new Error());
    }
}

class GetCurrentUserSubscriber extends ObservableSubscriber<UserAccount> {
    private _introductionViewModel: IntroductionViewModel;

    set introductionViewModel(value: IntroductionViewModel) {
        this._introductionViewModel = value;
    }

    public next(value?: UserAccount): void {
        this._introductionViewModel.handleCurrentUser(value);
    }

    public error(err?: IErrorBundle): void {
        this._introductionViewModel.setDefaultErrorBundle(err);
    }

    public complete(): void { super.complete(); }
}