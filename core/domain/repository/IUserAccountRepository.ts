import { Observable } from "rxjs";
import { UserAccount } from "../entity/UserAccount";
import { Callback } from "../usecase/base/SynchronousUseCase";

export interface IUserAccountRepository {
    getCurrentUser(): Observable<UserAccount>;
    getCurrentUserSynchronously(callback: Callback<UserAccount>): void;
    signUp(userName: string, password: string, firstName: string, lastname: string): Observable<UserAccount>;
    signIn(userName: string, password: string): Observable<UserAccount>;
    signOut(): Observable<void>;
}