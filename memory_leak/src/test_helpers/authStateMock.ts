export default class AuthStateMock {

    mockPipe: any
    mockSubscribe: any
    mockUnsubscribe: any
    mockSignInWithPopup: any
    mockSignOut: any
    constructor() {
        this.mockPipe = jest.fn(() => this);
        this.mockSubscribe = jest.fn(() => this);
        this.mockUnsubscribe = jest.fn(() => this);
        this.mockSignInWithPopup = jest.fn(() => this);
        this.mockSignOut = jest.fn(() => this);
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

    signInWithPopup(...args: any[]) {
        return this.mockSignInWithPopup()
    }

    signOut(...args: any[]) {
        return this.mockSignOut()
    }
    
}