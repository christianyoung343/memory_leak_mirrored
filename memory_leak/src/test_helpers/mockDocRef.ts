import MockDoc from "./mockDoc";

export default class MockDocRef<T> {
	doc: MockDoc<T>

	constructor(doc: MockDoc<T>) {
		this.doc = doc;
	}

	public get() {
		return this.fullPromiseBuilder();
	}

	public data() {
		return this.doc.data;
	}

	private async fullPromiseBuilder(): Promise<MockDocRef<T>> {
		let val = await this;
		return val;
	}
}