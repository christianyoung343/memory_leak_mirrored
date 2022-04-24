import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/models/answer';
import { Question } from 'src/models/question';
import { AnswerService } from '../services/answer.service';
import { QuestionService } from '../services/question.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-individual-comment',
    templateUrl: './individual-comment.component.html',
    styleUrls: ['./individual-comment.component.css'],
})
export class IndividualCommentComponent implements OnInit {

    @Input() public displayName!: string;
    @Input() public text!: string;
    @Input() public isAnonymous!: boolean;
    @Input() public comment!: { userID: string, comment: string };
    @Input() public isAnswer!: boolean;
    @Input() public isAdmin!: boolean;
    @Input() public question!: Question;
    @Input() public answer!: Answer;

    constructor(private us: UserService, private questionService: QuestionService, private answerService: AnswerService) { }

    ngOnInit(): void {
        if (this.comment) {
            this.text = this.comment.comment;
            this.us.getNameById(this.comment.userID).then(name => { this.displayName = name });
        }
    }

    deleteComment(question: any, comment: string) {
        let q: Question = question.question;
        for (let i = 0; i < q.comments.length; i++) {
            if (q.comments[i].comment === comment) {
                this.questionService.removeCommentFromQuestion(q, q.comments[i].comment, q.comments[i].userID);
            }
        }
    }

    deleteAnswerComment(question: any, comment: string) {
        for (let i = 0; i < question.answer.comments.length; i++) {
            if (question.answer.comments[i].comment === comment) {
                this.answerService.removeCommentFromAnswer(question.answer,
                    question.answer.comments[i].comment,question.answer.comments[i].userID);
            }
        }
    }

}
