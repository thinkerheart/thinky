import { Subscriber } from "rxjs";
import { IErrorBundle } from "../../exception/IErrorBundle";

export class ObservableSubscriber<T> extends Subscriber<T> {

    public next(value?: T): void {
        super.next(value);
    }

    public error(err?: IErrorBundle): void {
        super.error(err);
    }

    public complete(): void {
        super.complete();
    }
}