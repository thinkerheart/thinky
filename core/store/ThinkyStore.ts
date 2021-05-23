import { computed, observable } from "mobx";
import { UserAccountUIModelMapper } from "../adapter/mapper/UserAccountUIModelMapper";
import { UserAccountUIModel } from "../adapter/model/UserAccountUIModel";
import { HomeViewModel } from "../adapter/viewmodel/HomeViewModel";
import { IntroductionViewModel } from "../adapter/viewmodel/IntroductionViewModel";
import { SignInViewModel } from "../adapter/viewmodel/SignInViewModel";
import { SignUpViewModel } from "../adapter/viewmodel/SignUpViewModel";
import { ThinkyViewModel } from "../adapter/viewmodel/ThinkyViewModel";
import { ParseUserMapper } from "../data/mapper/ParseUserMapper";
import { UserAccountRepository } from "../data/repository/UserAccountRepository";
import { DefaultErrorBundle } from "../domain/exception/DefaultErrorBundle";
import { GetCurrentUserSynchronouslyUseCase } from "../domain/usecase/GetCurrentUserSynchronouslyUseCase";
import { GetCurrentUserUseCase } from "../domain/usecase/GetCurrentUserUseCase";
import { SignInUseCase } from "../domain/usecase/SignInUseCase";
import { SignOutUseCase } from "../domain/usecase/SignOutUseCase";
import { SignUpUseCase } from "../domain/usecase/SignUpUseCase";

export class ThinkyStore {

    private readonly Parse: any;
    private readonly userAccountUIMapper: UserAccountUIModelMapper;

    @observable
    private readonly _thinkyViewModel: ThinkyViewModel;

    @observable
    private readonly _introductionViewModel: IntroductionViewModel;

    @observable
    private readonly _signUpViewModel: SignUpViewModel;

    @observable
    private readonly _signInViewModel: SignInViewModel;

    @observable
    private readonly _homeViewModel: HomeViewModel;

    public constructor(Parse: any) {
        this.Parse = Parse;
        this.userAccountUIMapper = new UserAccountUIModelMapper();

        const userAccountRepository = new UserAccountRepository(this.Parse, new ParseUserMapper());

        this._thinkyViewModel = new ThinkyViewModel(
            new GetCurrentUserSynchronouslyUseCase(userAccountRepository),
            this.userAccountUIMapper,
            new DefaultErrorBundle(new Error()), new UserAccountUIModel()
        );

        this._introductionViewModel = new IntroductionViewModel(
            new GetCurrentUserUseCase(userAccountRepository),
            this.userAccountUIMapper,
            new DefaultErrorBundle(new Error()), new UserAccountUIModel()
        );

        this._signUpViewModel = new SignUpViewModel(
            new SignUpUseCase(userAccountRepository),
            this.userAccountUIMapper,
            new DefaultErrorBundle(new Error()), new UserAccountUIModel()
        );

        this._signInViewModel = new SignInViewModel(
            new SignInUseCase(userAccountRepository),
            this.userAccountUIMapper,
            new DefaultErrorBundle(new Error()), new UserAccountUIModel()
        );

        this._homeViewModel = new HomeViewModel(
            new SignOutUseCase(userAccountRepository),
            new DefaultErrorBundle(new Error())
        );
    }

    @computed
    get thinkyViewModel(): ThinkyViewModel {
        return this._thinkyViewModel;
    }

    @computed
    get introductionViewModel(): IntroductionViewModel {
        return this._introductionViewModel;
    }

    @computed
    get signUpViewModel(): SignUpViewModel {
        return this._signUpViewModel;
    }

    @computed
    get signInViewModel(): SignInViewModel {
        return this._signInViewModel;
    }

    @computed
    get homeViewModel(): HomeViewModel {
        return this._homeViewModel;
    }
}