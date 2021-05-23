import { UserAccount } from "../../domain/entity/UserAccount";
import { UserAccountUIModel } from "../model/UserAccountUIModel";

export class UserAccountUIModelMapper {
    public constructor() {}

    public transformUserAccount(userAccount: UserAccount): UserAccountUIModel {
        if (userAccount == null)
            throw new Error("Cannot transform a null UserAccount");

        const userAccountUIModel = new UserAccountUIModel();
        userAccountUIModel.setId(userAccount.id);
        userAccountUIModel.setUserName(userAccount.userName);
        userAccountUIModel.setFirstName(userAccount.firstName);
        userAccountUIModel.setEmail(userAccount.email);
        userAccountUIModel.setLastName(userAccount.lastName);

        return userAccountUIModel;
    }

    public transformUserAccounts(userAccounts: Array<UserAccount>): Array<UserAccountUIModel> {
        let userAccountUIModels: Array<UserAccountUIModel> = new Array<UserAccountUIModel>();

        if (userAccounts != null && userAccounts.length != 0) {
            userAccounts.forEach(value => userAccountUIModels.push(this.transformUserAccount(value)));
        }

        return userAccountUIModels;
    }
}