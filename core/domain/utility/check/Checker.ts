export class Checker {

    public static checkNotNull<T>(objectReference: T): T {
        if (objectReference == null) {
            throw new Error("Null Object Reference");
        }
        return objectReference;
    }
}