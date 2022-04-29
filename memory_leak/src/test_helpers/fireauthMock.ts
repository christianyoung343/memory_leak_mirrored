import AuthStateMock from "./authStateMock"

export default class FireauthMock {
    authState: any
    mockSignInWithPopup: any
    mockSignOut: any
    
    constructor() {
        this.authState = new AuthStateMock
        this.mockSignInWithPopup = jest.fn(() => this);
        this.mockSignOut = jest.fn(() => this);
    }
    signInWithPopup(...args: any[]) {
        return this.mockSignInWithPopup()
    }

    signOut(...args: any[]) {
        return this.mockSignOut()
    }
    
}
