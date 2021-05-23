import { UserAccount } from "../entity/UserAccount";
import { IUserAccountRepository } from "../repository/IUserAccountRepository";
import { Callback, SynchronousUseCase } from "./base/SynchronousUseCase";

export class GetCurrentUserSynchronouslyUseCase implements SynchronousUseCase<UserAccount, void> {

    private iUserAccountRepository: IUserAccountRepository;

    public constructor(iUserAccountRepository: IUserAccountRepository) {
        this.iUserAccountRepository = iUserAccountRepository;
    }
    
    execute(parameter: void, callback: Callback<UserAccount>): void {
        this.iUserAccountRepository.getCurrentUserSynchronously(callback);
    }
}