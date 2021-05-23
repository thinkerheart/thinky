import Parse from 'parse';
import { UserAccount } from '../../domain/entity/UserAccount';

export class ParseUserMapper {
    public constructor() {}

    public transformParseUser(parseUser: Parse.User): UserAccount {
        if (parseUser == null)
            throw new Error("Cannot transform a null ParseUser");
        
        const userAccount = new UserAccount();
        userAccount.id = parseUser.id;
        userAccount.userName = parseUser.get("userName");
        userAccount.email = parseUser.get("email");
        userAccount.firstName = parseUser.get("firstName");
        userAccount.lastName = parseUser.get("lastName");

        return userAccount;
    }

    public transformParseUsers(parseUsers: Array<Parse.User>): Array<UserAccount> {
        let userAccounts: Array<UserAccount> = new Array<UserAccount>();
        if (parseUsers != null && parseUsers.length != 0 && parseUsers.length != undefined) {
            parseUsers.forEach(value => userAccounts.push(this.transformParseUser(value)));
        }
        return userAccounts;
    }
}