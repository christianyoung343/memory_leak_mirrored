export class Answer {

    public uid?: string;
    public body: string;
    public comments: Array<{ userID: string, comment: string }>;
    public answererID: string; //User ID
    public questionID: string;
	public votes?: Array<{ userID: string, voteType: number }>;

    constructor(answerObj:any) {
        this.uid = answerObj.uid;
        this.body = answerObj.body;
        this.comments = answerObj.comments;
        this.answererID = answerObj.answererID;
        this.questionID = answerObj.questionID;
		this.votes = answerObj.votes;
    }
}