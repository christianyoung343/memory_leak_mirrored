export class User {

    public uid: string;
    public email: string;
    public displayName: string;
    public askedQuestionIDs?: Array<string>[];

    constructor(userObj:any) {
        this.uid = userObj.uid;
        this.email = userObj.email;
        this.askedQuestionIDs = userObj.askedQuestionIDs;
        this.displayName = userObj.displayName;
    }
}