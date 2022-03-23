//https://stackoverflow.com/questions/52043886/how-do-you-mock-firebase-firestore-methods-using-jest
export default class FirestoreMock {
    mockCollection: any
    mockValueChanges: any
    mockSubscribe: any
    mockWhere: any
    mockOrderBy: any
    mockAdd: any
    mockGet: any
    mockOnSnaptshot: jest.Mock<any, [success: any, error: any]>
    private _mockAddReturn: any
    private _mockGetReturn: any
    private _mockOnSnaptshotSuccess: any
    constructor() {
        // mocked methods that return the class
        this.mockCollection = jest.fn(() => this)
        this.mockValueChanges = jest.fn(() => this)
        this.mockSubscribe = jest.fn(() => this)
        this.mockWhere = jest.fn(() => this)
        this.mockOrderBy = jest.fn(() => this)

        // methods that return promises
        this.mockAdd = jest.fn(() => Promise.resolve(this.mockAddReturn))
        this.mockGet = jest.fn(() => Promise.resolve(this.mockGetReturn))

        // methods that accepts callbacks
        this.mockOnSnaptshot = jest.fn((success, error) => success(this.mockOnSnaptshotSuccess))

        // return values
        this.mockAddReturn = null
        this.mockGetReturn = null
        this.mockOnSnaptshotSuccess = null
    }

    valueChanges() {
        return this.mockValueChanges()
    }

    subscribe() {
        return this.mockSubscribe()
    }

    collection(c: any) {
        return this.mockCollection(c)
    }

    where(...args: any[]) {
        return this.mockWhere(...args)
    }

    orderBy(...args: any[]) {
        return this.mockOrderBy(...args)
    }

    add(a: any) {
        return this.mockAdd(a)
    }

    get() {
        return this.mockGet()
    }

    onSnapshot(success: any, error: any) {
        return this.mockOnSnaptshot(success, error)
    }

    set mockAddReturn(val: null) {
        this._mockAddReturn = val
    }

    set mockGetReturn(val: null) {
        this._mockGetReturn = val
    }

    set mockOnSnaptshotSuccess(val: null) {
        this._mockOnSnaptshotSuccess = val
    }

    reset() {
        // reset all the mocked returns
        this.mockAddReturn = null
        this.mockGetReturn = null
        this.mockOnSnaptshotSuccess = null

        // reset all the mocked functions
        this.mockCollection.mockClear()
        this.mockWhere.mockClear()
        this.mockOrderBy.mockClear()
        this.mockAdd.mockClear()
        this.mockGet.mockClear()
    }
}