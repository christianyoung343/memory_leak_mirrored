import AuthStateMock from "./authStateMock"

export default class FireauthMock {
    authState: any
    
    constructor() {
        this.authState = new AuthStateMock
        
    }
    
}
