import { Observable } from "rxjs";
import { IUserAccountRepository } from "../repository/IUserAccountRepository";
import { ObservableUseCase } from "./base/ObservableUseCase";

export class SignOutUseCase extends ObservableUseCase<void, void> {
    private iUserAccountRepository: IUserAccountRepository;

    public constructor(iUserAccountRepository: IUserAccountRepository) {
        super();
        this.iUserAccountRepository = iUserAccountRepository;
    }

    protected buildObservableUseCase(params: void): Observable<void> {
        return this.iUserAccountRepository.signOut();
    }
}