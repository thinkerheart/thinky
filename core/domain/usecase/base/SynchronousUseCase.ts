import { IErrorBundle } from "../../exception/IErrorBundle";

export interface SynchronousUseCase<Rs, Ps> {
    execute(parameter: Ps, callback: Callback<Rs>): void;
}

export interface Callback<Rs> {
    onSuccess(_return: Rs): void;
    onError(throwable: IErrorBundle): void;
}