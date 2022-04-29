import { TestBed } from '@angular/core/testing';
import { Question } from 'src/models/question';
import FirestoreMock from 'src/test_helpers/firestoreMock';
import TestBedExtended from 'src/test_helpers/testBedExtend';

import { QuestionService } from './question.service';

describe('QuestionService', () => {
	let service: QuestionService;

	beforeEach(() => {
		TestBedExtended.preConfigure();
		TestBed.configureTestingModule({});
		service = TestBed.inject(QuestionService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should access the database', () => {
		expect(service.getQuestions()).toBeTruthy();
	});

	it('should have a working mock', () => {
		let sut = new FirestoreMock();
		let collection = sut.collection('questions').valueChanges();
		let doc1 = collection.doc("test");

		collection.doc("test")?.set("New value");
		expect(doc1?.data).toBe("New value");
	})

	it('should add/update questions', () => {
		let sut = new Question("uid", "QuestionServiceTest", "QuestionServiceTest", false, [], "askerID", "", 0);
		let sut2 = new Question("uid2", "QuestionServiceTest2", "QuestionServiceTest2", false, [], "askerID2", "", 0);
		let collection: any;

		collection = service.getQuestions();
		expect(collection.doc("uid").data).toBe("uid");

		service.updateQuestion("uid", sut);
		service.updateQuestion("uid2", sut2);

		collection = service.getQuestions();

		expect(collection.doc("uid2").data).toBe(sut2);
		expect(collection.doc("uid").data).toBe(sut);
	});

	it('should append comments to questions', () => {
		let sut = new Question("uid", "QuestionServiceTest", "QuestionServiceTest", false, [], "askerID", "", 0);
		expect(sut.comments.length).toBe(0);

		service.addCommentToQuestion("Test Comment", sut, "userID");
		let collection: any;
		collection = service.getQuestions();

		expect(collection.doc("uid").data.comments.length).toBe(1);
	});

	it('should remove questions', () => {
		let sut = new Question("uid", "QuestionServiceTest", "QuestionServiceTest", false, [], "askerID", "", 0);

		service.updateQuestion("uid", sut);
		let collection: any;
		collection = service.getQuestions();

		expect(collection.doc("uid").data).toBe(sut);

		service.removeQuestion(sut);
		collection = service.getQuestions();

		expect(collection.doc("uid").data).toBeUndefined();
	})
});
