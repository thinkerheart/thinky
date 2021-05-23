import { action, computed, observable } from "mobx";
import { UserAccountRepository } from "../../data/repository/UserAccountRepository";
import { UserAccount } from "../../domain/entity/UserAccount";
import { DefaultErrorBundle } from "../../domain/exception/DefaultErrorBundle";
import { IErrorBundle } from "../../domain/exception/IErrorBundle";
import { Callback } from "../../domain/usecase/base/SynchronousUseCase";
import { GetCurrentUserSynchronouslyUseCase } from "../../domain/usecase/GetCurrentUserSynchronouslyUseCase";
import { UserAccountUIModelMapper } from "../mapper/UserAccountUIModelMapper";
import { UserAccountUIModel } from "../model/UserAccountUIModel";
import { BaseViewModel } from "./BaseViewModel";

export class ThinkyViewModel extends BaseViewModel {

    @observable
    private _currentUser: UserAccountUIModel;

    private getCurrentUserSynchronouslyUseCase: GetCurrentUserSynchronouslyUseCase;
    private userAccountUIModelMapper: UserAccountUIModelMapper;

    public constructor(
        getCurrentUserSynchronouslyUseCase: GetCurrentUserSynchronouslyUseCase,
        userAccountUIModelMapper: UserAccountUIModelMapper,
        defaultErrorBundle: IErrorBundle, currentUser: UserAccountUIModel) {
        super(defaultErrorBundle);
        this.getCurrentUserSynchronouslyUseCase = getCurrentUserSynchronouslyUseCase;
        this.userAccountUIModelMapper = userAccountUIModelMapper;
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
        this._currentUser = this.userAccountUIModelMapper.transformUserAccount(currentUser);
    }

    @action
    public checkCurrentUser() {
        const thinkyCallback = new ThinkyCallback();
        thinkyCallback.thinkyViewModel = this;
        this.getCurrentUserSynchronouslyUseCase.execute(null, thinkyCallback);
    }

    public reinitializeStateValueProperty() {
        this._currentUser = new UserAccountUIModel();
        this._defaultErrorBundle = new DefaultErrorBundle(new Error());
    }
}

class ThinkyCallback implements Callback<UserAccount> {

    private _thinkyViewModel: ThinkyViewModel;

    set thinkyViewModel(value: ThinkyViewModel) {
        this._thinkyViewModel = value;
    }
    onSuccess(_return: UserAccount): void {
        this._thinkyViewModel.handleCurrentUser(_return);
    }
    onError(throwable: IErrorBundle): void {
        this._thinkyViewModel.setDefaultErrorBundle(throwable);
    }
}