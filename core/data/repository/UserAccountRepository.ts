import { computed } from "mobx";
import { Observable } from "rxjs";
import { UserAccount } from "../../domain/entity/UserAccount";
import { ErrorValueEnum } from "../../domain/enum/ErrorValueEnum";
import { DefaultErrorBundle } from "../../domain/exception/DefaultErrorBundle";
import { IUserAccountRepository } from "../../domain/repository/IUserAccountRepository";
import { Callback } from "../../domain/usecase/base/SynchronousUseCase";
import { ParseUserMapper } from "../mapper/ParseUserMapper";

export class UserAccountRepository implements IUserAccountRepository {

    private Parse: any;
    private parseUserMapper: ParseUserMapper;

    public constructor(Parse: any, parseUserMapper: ParseUserMapper) {
        this.Parse = Parse;
        this.parseUserMapper = parseUserMapper; 
    }

    public getCurrentUser(): Observable<UserAccount> {
        return new Observable<UserAccount>(subscriber => {
            this.Parse.User.currentAsync().then(user => {
                if (user == null) {
                    subscriber.error(new DefaultErrorBundle(new Error(ErrorValueEnum.current_user_account_not_found)));
                } else {
                    subscriber.next(this.parseUserMapper.transformParseUser(user));
                    subscriber.complete();
                }
            });
        });
    }
    public getCurrentUserSynchronously(callback: Callback<UserAccount>): void {
        const currentUser = this.Parse.User.current();
        if (currentUser == null) {
            callback.onError(new DefaultErrorBundle(new Error(ErrorValueEnum.current_user_account_not_found)));
        } else {
            callback.onSuccess(this.parseUserMapper.transformParseUser(currentUser));
        }
    }

    public signUp(
        userName: string, 
        password: string, 
        firstName: string, 
        lastname: string
    ): Observable<UserAccount> {
        return new Observable<UserAccount>(subscriber => {
            let user = new this.Parse.User();
            user.set("username", userName);
            user.set("password", password);
            user.set("firstName", firstName);
            user.set("lastName", lastname);

            user.signUp().then(user => {
                subscriber.next(this.parseUserMapper.transformParseUser(user));
                subscriber.complete();
            }).catch(error => {
                subscriber.error(new DefaultErrorBundle(error));
            });
        });
    }

   public signIn(userName: string, password: string): Observable<UserAccount> {
        return new Observable<UserAccount>(subscriber => {
            this.Parse.User.logIn(userName, password).then(user => {
                subscriber.next(this.parseUserMapper.transformParseUser(user));
                subscriber.complete();
            }).catch(error => {
                subscriber.error(new DefaultErrorBundle(error));
            });
        });
    }

    public signOut(): Observable<void> {
        return new Observable<void>(subscriber => {
            this.Parse.User.logOut().then(() => {
                subscriber.complete();
            }).catch(error => {
                subscriber.error(new DefaultErrorBundle(error));
            })
        });
    }
}