import { TestBed } from '@angular/core/testing';
import { Answer } from 'src/models/answer';
import { Question } from 'src/models/question';
import FirestoreMock from 'src/test_helpers/firestoreMock';
import TestBedExtended from 'src/test_helpers/testBedExtend';

import { AnswerService } from './answer.service';

describe('AnswerService', () => {
  let service: AnswerService;

  beforeEach(() => {
    TestBedExtended.preConfigure()
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should access the database', () => {
    expect(service.getAnswers()).toBeTruthy();
  })

  it('should have a working mock', () => {
    let sut = new FirestoreMock()
    let collection = sut.collection('answers').valueChanges()
    let doc1 = collection.doc("test")
    collection.doc("test")?.set("New value")
    expect(doc1?.data).toBe("New value")
  })

  it('should update answers', () => {
    let sut = new Answer({ 
      uid : "uid",
      body : "AnswerServiceTest",
      comments : [],
      answererID : "answererID",
      questionID : "questionID"
    });
    let sut2 = new Answer({ 
      uid : "uid2",
      body : "AnswerServiceTest2",
      comments : [],
      answererID : "answererID2",
      questionID : "questionID2"
    });
    let collection: any;
    collection = service.getAnswers()

    expect(collection.doc("uid").data).toBe("uid")


    service.updateAnswer("uid", sut)

    service.updateAnswer("uid2", sut2)

    collection = service.getAnswers()

    expect(collection.doc("uid2").data).toBe(sut2)

    expect(collection.doc("uid").data).toBe(sut)

  })

  
	it('should add an answer', () => {
		let q = new Question("uid", "QuestionServiceTest", "QuestionServiceTest", false, [], "askerID", "", 0)
		let mock = jest.fn(() => { service.addAnswer("New answer", q, "userID") })
		mock()
		expect(mock).toHaveReturned()

    let ansDoc: Answer = {
			answererID: "userID",
			body: "New answer",
			comments: [],
			questionID: q.uid,
			uid: ''
		}
    let collection: any;
    collection = service.getAnswers()
    expect(collection.doc("Add0").data).toStrictEqual(ansDoc)
	})

  it('should append comments to answers', () => {
    let sut = new Answer({ 
      uid : "uid",
      body : "AnswerServiceTest",
      comments : [],
      answererID : "answererID",
      questionID : "questionID"
    });
    expect(sut.comments.length).toBe(0);

    //Check name of this
    service.addCommentToQuestion("Test Comment", sut, "userID")
    let collection: any;
    collection = service.getAnswers()

    expect(collection.doc("uid").data.comments.length).toBe(1)
  })

  it('should remove answers', () => {
    let sut = new Answer({ 
      uid : "uid",
      body : "AnswerServiceTest",
      comments : [],
      answererID : "answererID",
      questionID : "questionID"
    });
    let sut2 = new Answer({ 
      uid : "uid2",
      body : "AnswerServiceTest",
      comments : [],
      answererID : "answererID",
      questionID : "questionID2"
    });

    service.updateAnswer("uid", sut)
    service.updateAnswer("uid2", sut2)
    let collection: any;
    collection = service.getAnswers()

    expect(collection.doc("uid").data).toStrictEqual(sut)
    expect(collection.doc("uid2").data).toStrictEqual(sut2)


		let q = new Question("questionID", "QuestionServiceTest", "QuestionServiceTest", false, [], "askerID", "", 0)
    service.removeAnswersFromQuestion(q)
    collection = service.getAnswers()

    expect(collection.doc("uid").data).toBeUndefined()
    expect(collection.doc("uid2").data).toStrictEqual(sut2)
  })
});
