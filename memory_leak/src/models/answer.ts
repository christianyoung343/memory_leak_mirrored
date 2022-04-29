export class Answer {

	uid?: string;
	body: string;
	comments: Array<{ userID: string, comment: string }>;
	answererID: string; //User ID
	questionID: string;
	votes?: Array<{ userID: string, voteType: number }>;

	constructor(answerObj: any) {
		this.uid = answerObj.uid;
		this.body = answerObj.body;
		this.comments = answerObj.comments;
		this.answererID = answerObj.answererID;
		this.questionID = answerObj.questionID;
		this.votes = answerObj.votes;
	}
}