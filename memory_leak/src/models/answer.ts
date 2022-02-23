export class Answer {

    public uid?: string;
    public body: string;
    public comments: Array<[string,string]>[];
    public answererID: string; //User ID
    public questionID: string;

    constructor(answerObj:any) {
        this.uid = answerObj.uid;
        this.body = answerObj.body;
        this.comments = answerObj.comments;
        this.answererID = answerObj.answererID;
        this.questionID = answerObj.questionID;
    }
}