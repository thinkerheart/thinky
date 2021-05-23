import { Observable } from "rxjs";
import { UserAccount } from "../entity/UserAccount";
import { IUserAccountRepository } from "../repository/IUserAccountRepository";
import { ObservableUseCase } from "./base/ObservableUseCase";

export class GetCurrentUserUseCase extends ObservableUseCase<UserAccount, void> {

    private iUserAccountRepository: IUserAccountRepository;

    public constructor(iUserAccountRepository: IUserAccountRepository) {
        super();
        this.iUserAccountRepository = iUserAccountRepository;
    }
    protected buildObservableUseCase(params: void): Observable<UserAccount> {
        return this.iUserAccountRepository.getCurrentUser();
    }
}