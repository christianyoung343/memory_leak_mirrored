import MockDocRef from "./mockDocRef";

export default class MockDoc<T> {
	data: any | undefined;
	id: string;
	ref: any;

	constructor(data: T) {
		this.data = data;
		let refFunc = () => { return new MockDocRef<T>(this) };

		this.ref = refFunc();
		let idfunc = () => { if (this.data && this.data["uid"]) { return this.data["uid"] } else { return "noIDFound" } };
		this.id = idfunc();

	}

	public get() {
		return this.fullPromiseBuilder();
	}

	public set(data: T, options?: { merge: boolean }) {
		if (options && options.merge) {
			this.update(data);
		}
		else {
			this.data = data;
		}
	}

	public delete() {
		this.data = undefined;
	}

	public update(changes: Object) {
		let val = typeof this.data;
		if (val == "string") {
			this.data = {};
		}

		for (const [k, v] of Object.entries(changes)) {
			if (this.data) {
				this.data[k] = v;
			}
		}
	}

	public valueChanges() {
		return this;
	}

	public subscribe(todo?: (param: any) => any) {
		if (todo) {
			return todo(this);
		}
		else {
			return this;
		}
	}

	private async fullPromiseBuilder(): Promise<MockDoc<T>> {
		let val = await this;

		return val;
	}

	private async dataPromiseBuilder(): Promise<T> {
		let val = await this.data;

		return val;
	}

	public toPromise() {
		return this.fullPromiseBuilder();
	}
}