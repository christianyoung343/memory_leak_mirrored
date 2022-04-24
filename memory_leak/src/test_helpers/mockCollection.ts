import MockDoc from "./mockDoc";

export default class MockCollection<T> {
    mockDocs: Map<string, MockDoc<any>>
    docId: string
    data: any;

    constructor(mockDocs?: Map<string, MockDoc<any>>) {
        if (mockDocs) {
            this.mockDocs = mockDocs
        } else {
            this.mockDocs = new Map<string, MockDoc<any>>()
        }
        this.docId = "";
        this.data = () => {
            if (this.mockDocs.get(this.docId)) {
                return this.mockDocs.get(this.docId)?.data
            } else {
                return this.docId
            }
        }
    }


    doc(id: string) : MockDoc<any> | undefined {
        if (this.mockDocs.get(id)) {
            return this.mockDocs.get(id)
        } else {
            let temp = new MockDoc(id)
            this.mockDocs.set(id, temp)
            return this.mockDocs.get(id)
        }
    }

    add(data: any) {
        let newId = "Add" + this.mockDocs.size
        this.mockDocs.set(newId, new MockDoc(data))
        return this.mockDocs.get(newId)?.toPromise()
    }

    subscribe() {
        return this
    }

    valueChanges() {
        return this
    }
}