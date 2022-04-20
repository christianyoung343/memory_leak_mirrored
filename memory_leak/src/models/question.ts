export class Question {

    constructor(
    public uid: string,
    public title: string,
    public body: string,
    public anonymous: boolean,
    public comments: Array<{ userID: string, comment: string }>,
    public askerID: string, //ID of user that asked the question
    public acceptedAnswerID: string, 
    public flag: number,
	public votes?: Array<{ userID: string, voteType: number }>
    ){ }
    
    //  constructor(questionObj:any) {
    //     this.uid = questionObj.uid;
    //     this.title = questionObj.title;
    //     this.body = questionObj.body;
    //     this.anonymous = questionObj.anonymous;
    //     this.comments = questionObj.comments;
    //     this.askerID = questionObj.askerID;
    //     this.acceptedAnswerID = questionObj.acceptedAnswerID;
    //     this.flag = questionObj.flag
    // }
}