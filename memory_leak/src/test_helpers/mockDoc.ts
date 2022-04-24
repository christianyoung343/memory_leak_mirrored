export default class MockDoc<T> {
    public data: T | undefined;

    constructor(data: T) {
        this.data = data;
    }

    public set(data: T) {
        this.data = data;
    }

    public delete() {
        this.data = undefined;
    }

    public valueChanges() {
        return this;
    }

    public subscribe() {
        return this;
    }

    private async promiseBuilder() : Promise<T | undefined> {
        let val = await this.data;
        return val;
    }

    public toPromise() {
        return this.promiseBuilder()
    }
}