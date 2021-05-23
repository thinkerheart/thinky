import { Observable } from "rxjs";
import { UserAccount } from "../entity/UserAccount";
import { IUserAccountRepository } from "../repository/IUserAccountRepository";
import { Checker } from "../utility/check/Checker";
import { ObservableUseCase } from "./base/ObservableUseCase";

export class SignInUseCase extends ObservableUseCase<UserAccount, Ps> {

    private iUserAccountRepository: IUserAccountRepository;

    public constructor(iUserAccountRepository: IUserAccountRepository) {
        super();
        this.iUserAccountRepository = iUserAccountRepository;
    }
    protected buildObservableUseCase(params: Ps): Observable<UserAccount> {
        Checker.checkNotNull(params);
        return this.iUserAccountRepository.signIn(
            params.userName, params.password
        );
    }
}

export class Ps {
    private _userName: string;
    private _password: string;

    private constructor(userName: string, password: string) {
        this._userName = userName;
        this._password = password;
    }

    public static forPs(userName: string, password: string) {
        return new Ps(userName, password);
    }

    get userName(): string {
        return this._userName;
    }
    set userName(value: string) {
        this._userName = value;
    }

    get password(): string {
        return this._password;
    }
    set password(value: string) {
        this._password = value;
    }
}