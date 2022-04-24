import { UserService } from './user.service';
import TestBedExtended from 'src/test_helpers/testBedExtend';

describe('UserService', () => {
	let service: UserService;

	beforeEach(() => {
		TestBedExtended.preConfigure();
		service = TestBedExtended.inject(UserService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should access the database', () => {
		expect(service.getUsers()).toBeTruthy();
	})

	it('should get the current user', () => {
		let mock = jest.fn(() => { service.getUser() })
		mock()
		expect(mock).toHaveReturned()
		expect(service.getUser()).toBeTruthy(); //FIXME: Does this work?
	})

	it('should refresh who the user is', async () => {
		let userObj = {
			uid: "uid",
			email: "email",
			displayName: "Display Name"
		}

		let collection: any;
		collection = service.getUsers()
		expect(collection.doc("uid").data).toBe("uid");

		await service.refreshUser(userObj)
		collection = service.getUsers()

		expect(collection.doc("uid").data).toStrictEqual(userObj)
	})

	it('should perform google auth', async () => {
		let mock = jest.fn(() => { service.googleSignIn() })
		await mock()
		expect(mock).toHaveReturned()
	})

	it('should sign out users', async () => {
		let mock = jest.fn(() => { service.signOut() })
		await mock()
		expect(mock).toHaveReturned()
	})

	it('should remove a question from a user', () => {
		let userObj = {
			uid : "uid",
			email : "email",
			askedQuestionIDs : ["testID"],
			displayName : "Display Name"
		}
		let userObjAfter = {
			uid : "uid",
			email : "email",
			askedQuestionIDs : [],
			displayName : "Display Name"
		}
		let userObj2 = {
			uid : "uid2",
			email : "email2",
			askedQuestionIDs : ["testID2"],
			displayName : "Display Name2"
		}
		let collection: any;
		collection = service.getUsers()
		collection.doc("uid").set(userObj)
		collection.doc("uid2").set(userObj2)
		expect(collection.doc("uid").data).toBe(userObj);
		expect(collection.doc("uid2").data).toBe(userObj2);

		service.removeQuestionFromUser("testID");
		
		expect(collection.doc("uid").data).toStrictEqual(userObjAfter);
		expect(collection.doc("uid2").data).toBe(userObj2);

	})

	it('should get the name of a user given the id', async () => {
		let userObj = {
			uid : "uid",
			email : "email",
			displayName : "Display Name"
		}
		service.refreshUser(userObj)
		let collection: any;
		collection = service.getUsers()
		expect(collection.doc("uid").data).toStrictEqual(userObj);
		await expect(service.getNameById("uid")).resolves.toBe("Display Name");
	})
});
