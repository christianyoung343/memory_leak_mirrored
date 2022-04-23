import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/models/answer';
import { Question } from 'src/models/question';
import { User } from 'src/models/user';
import { QuestionService } from '../services/question.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-individual-answer',
    templateUrl: './individual-answer.component.html',
    styleUrls: ['./individual-answer.component.css']
})
export class IndividualAnswerComponent implements OnInit {

    @Input() public displayName!: string;
    @Input() public text!: string;
    @Input() public isAnonymous!: boolean;
    @Input() public answer!: Answer;
    @Input() public comments!: any[];
    @Input() public askerID!: string;
    @Input() public questionAnonymous!: boolean;
    @Input() public accepted!: boolean;
    @Input() public userID!: string;
    @Input() public question!: Question;
    @Input() public isAdmin!: boolean;

    constructor(private us: UserService, private qs: QuestionService) { }

    ngOnInit(): void {
        if (this.answer) {
            this.text = this.answer.body;
            this.comments = this.answer.comments;
            this.us.getNameById(this.answer.answererID).then(name => { this.displayName = name });
        }
    }

    updateAcceptedAnswer(){
        if(this.answer.uid){
            this.question.acceptedAnswerID = this.answer.uid;            
        }

        this.qs.updateQuestion(this.question.uid, this.question);
    }

    unacceptAnswer(){
        this.question.acceptedAnswerID = "";
        this.qs.updateQuestion(this.question.uid, this.question);
    }
}
