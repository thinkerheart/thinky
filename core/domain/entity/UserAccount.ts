export class UserAccount {
    private _id: string;
    private _userName: string;
    private _email: string;
    private _firstName: string;
    private _lastName: string;

    public constructor() {
        this._id = "";
        this._userName = "";
        this._email = "";
        this._firstName = "";
        this._lastName = "";
    }

    get id(): string {
        return this._id;
    }
    set id(value: string) {
        this._id = value;
    }

    get userName(): string {
        return this._userName;
    }
    set userName(value: string) {
        this._userName = value;
    }

    get email(): string {
        return this._email;
    }
    set email(value: string) {
        this._email = value;
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