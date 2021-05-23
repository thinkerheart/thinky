import { Observable } from "rxjs";
import { UserAccount } from "../entity/UserAccount";
import { IUserAccountRepository } from "../repository/IUserAccountRepository";
import { Checker } from "../utility/check/Checker";
import { ObservableUseCase } from "./base/ObservableUseCase";

export class SignUpUseCase extends ObservableUseCase<UserAccount, Ps> {

    private iUserAccountRepository: IUserAccountRepository;

    public constructor(iUserAccountRepository: IUserAccountRepository) {
        super();
        this.iUserAccountRepository = iUserAccountRepository;
    }

    protected buildObservableUseCase(params: Ps): Observable<UserAccount> {
        Checker.checkNotNull(params);
        return this.iUserAccountRepository.signUp(
            params.userName, params.password, params.firstName, params.lastName
        );
    }
}

export class Ps {
    private _userName: string;
    private _password: string;
    private _firstName: string;
    private _lastName: string;

    private constructor(userName: string, password: string, firstName: string, lastName: string) {
        this._userName = userName;
        this._password = password;
        this._firstName = firstName;
        this._lastName = lastName;
    }

    public static forPs(userName: string, password: string, firstName: string, lastName: string) {
        return new Ps(userName, password, firstName, lastName);
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

    get firstName(): string {
        return this._firstName;
    }
    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }
    set lastName(value: string) {
        this._lastName = value;
    }
}