import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/models/question';
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

    constructor(private us: UserService, private questionService: QuestionService) { }

    ngOnInit(): void {
        if (this.comment) {
            this.text = this.comment.comment;
            this.us.getNameById(this.comment.userID).then(name => { this.displayName = name });
        }
    }

    deleteComment(question: any, comment: string){
        let q: Question = question.question;
    //    console.log(question.question);
        for(let i =0; i< q.comments.length; i++){
            if(q.comments[i].comment === comment){
                console.log("You found the comment");
               // console.log(typeof q.comments[i]);
                this.questionService.removeCommentFromQuestion(q, q.comments[i].comment, q.comments[i].userID);
            }
        }
        
        
    }

}
