export default class MockDoc<T> {
    public data: any | undefined;
    public id: string

    constructor(data: T) {
        this.data = data;
        let idfunc = () => { if (this.data && this.data["uid"]) { return this.data["uid"] } else { return "noIDDound" } }
        this.id = idfunc();
        
    }

    public get() {
        return this.fullPromiseBuilder();
    }

    public set(data: T) {
        this.data = data;
    }

    public delete() {
        this.data = undefined;
    }

    public update(changes: Object) {
        for (const [k, v] of Object.entries(changes)) {
            if (this.data&& this.data[k]) {
                this.data[k] = v;
            }
        }
    }

    public valueChanges() {
        return this;
    }

    public subscribe() {
        return this;
    }

    private async fullPromiseBuilder() : Promise<MockDoc<T>> {
        let val = await this;
        return val;
    }

    private async dataPromiseBuilder() : Promise<T> {
        let val = await this.data;
        return val;
    }

    public toPromise() {
        return this.fullPromiseBuilder()
    }
}