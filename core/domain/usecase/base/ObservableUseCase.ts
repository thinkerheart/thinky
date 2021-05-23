import { Observable, Subscriber } from "rxjs";
import { Checker } from "../../utility/check/Checker";
import { AsynchronousRxUseCase } from "./AsynchronousRxUseCase";

export abstract class ObservableUseCase<Rs, Ps> extends AsynchronousRxUseCase {

    protected constructor() {
        super();
    }

    protected abstract buildObservableUseCase(params: Ps): Observable<Rs>; 

    public execute(subscriber: Subscriber<Rs>, params: Ps): void {
        Checker.checkNotNull(subscriber);

        const observable: Observable<Rs> = this.buildObservableUseCase(params);
        this.addSubscription(observable.subscribe(subscriber));
    }
}