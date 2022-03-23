export default class AuthStateMock {

    mockPipe: any
    mockSubscribe: any
    mockUnsubscribe: any
    constructor() {
        this.mockPipe = jest.fn(() => this);
        this.mockSubscribe = jest.fn(() => this);
        this.mockUnsubscribe = jest.fn(() => this);
    }
    
    pipe(...args: any[]) {
        return this.mockPipe()
    }

    subscribe(...args: any[]) {
        return this.mockSubscribe()
    }

    unsubscribe(...args: any[]) {
        return this.mockUnsubscribe()
    }
    
}