import { action, computed, observable } from "mobx";

export class UserAccountUIModel {
    @observable
    private _id: string;

    @observable
    private _userName: string;

    @observable
    private _email: string;

    @observable
    private _firstName: string;

    @observable
    private _lastName: string;

    public constructor() {
        this._id = "";
        this._userName = "";
        this._email = "";
        this._firstName = "";
        this._lastName = "";
    }

    @computed
    get id(): string {
        return this._id;
    }

    @action
    public setId(value: string) {
        this._id = value;
    }

    @computed
    get userName(): string {
        return this._userName;
    }

    @action
    public setUserName(value: string) {
        this._userName = value;
    }

    @computed
    get email(): string {
        return this._email;
    }

    @action
    public setEmail(value: string) {
        this._email = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    @action
    public setFirstName(value: string) {
        this._firstName = value;
    }

    @computed
    get lastName(): string {
        return this._lastName;
    }

    @action
    public setLastName(value: string) {
        this._lastName = value;
    }
}