import { Subscription } from "rxjs";
import { Checker } from "../../utility/check/Checker";

export abstract class AsynchronousRxUseCase {

    protected readonly _subscriptions: Subscription;

    protected constructor() {
        this._subscriptions = new Subscription();
    }

    public unsubscribe(): void {
        if (!this._subscriptions.closed) {
            this._subscriptions.unsubscribe();
        }
    }

    protected addSubscription(subscription: Subscription) {
        Checker.checkNotNull(subscription);
        Checker.checkNotNull(this._subscriptions);

        this._subscriptions.add(subscription);
    }
}