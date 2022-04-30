export class Question {
	constructor(
		public uid: string,
		public title: string,
		public body: string,
		public anonymous: boolean,
		public comments: Array<{ userID: string, comment: string }>,
		public askerID: string, //ID of user that asked the question
		public acceptedAnswerID: string,
		public flag: number
	) { }
}