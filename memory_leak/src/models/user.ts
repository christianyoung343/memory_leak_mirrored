export class User {
	uid: string;
	email: string;
	displayName: string;
	askedQuestionIDs?: Array<string>;
	admin?: boolean;

	constructor(userObj: any) {
		this.uid = userObj.uid;
		this.email = userObj.email;
		this.askedQuestionIDs = userObj.askedQuestionIDs;
		this.displayName = userObj.displayName;
	}
}