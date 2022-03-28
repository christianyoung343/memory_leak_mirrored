import { Component, Input, OnInit } from '@angular/core';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';
import { Answer } from 'src/models/answer';
import { Question } from 'src/models/question';
import { User } from 'src/models/user';

@Component({
    selector: 'app-answer-parent',
    templateUrl: './answer-parent.component.html',
    styleUrls: ['./answer-parent.component.css']
})
export class AnswerParentComponent implements OnInit {

    @Input() answers!: Answer[];
    @Input() question!: Question;
    public newAnswerText: string = "";
    @Input() public user!: User;

    constructor(private as: AnswerService, private us: UserService, private qs: QuestionService) { }

    ngOnInit(): void {
        this.us.getUser().subscribe(u => {
            if(u != undefined && u != null){
                this.user = u;
            }
        })
    }

    updateAnswer(answer: string) {
        let userID = "";
        if (this.user != null) {
            userID = this.user?.uid;
        }

        this.as.addAnswer(answer, this.question, userID);
        this.newAnswerText = "";
    }
}
