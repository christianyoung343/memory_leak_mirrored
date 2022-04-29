import { TestBed } from '@angular/core/testing';
import { Question } from 'src/models/question';
import FirestoreMock from 'src/test_helpers/firestoreMock';
import TestBedExtended from 'src/test_helpers/testBedExtend';

import { QuestionCreationService } from './question-creation.service';

describe('QuestionCreationService', () => {
	let service: QuestionCreationService;

	beforeEach(() => {
		TestBedExtended.preConfigure();
		TestBed.configureTestingModule({});
		service = TestBed.inject(QuestionCreationService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should have a working mock', () => {
		let fs = new FirestoreMock()
		let collection = fs.collection('questions').valueChanges()
		let sut = new Question("uid", "QuestionServiceTest", "QuestionServiceTest", false, [], "askerID", "", 0)
		let sut2 = new Question("uid2", "QuestionServiceTest2", "QuestionServiceTest2", false, [], "askerID2", "", 0)

		collection.add(sut)?.then((s) => {
			s.get().then((q) => {
				expect(q.data).toBe(sut)
				expect(q.data).not.toBe(sut2)
			})
		})
	})

	it('should add a question', () => {
		let sut = new Question("uid", "QuestionServiceTest", "QuestionServiceTest", false, [], "askerID", "", 0)
		let mock = jest.fn(() => { service.addQuestion(sut) })
		mock()
		expect(mock).toHaveReturned()
	})

	it('should return the correct question number', async () => {
		expect(service.getQNum()).toBe('')
		let sut = new Question("uid", "QuestionServiceTest", "QuestionServiceTest", false, [], "askerID", "", 0)
		await service.addQuestion(sut)
		expect(service.getQNum()).toBe("uid")
	})
});
