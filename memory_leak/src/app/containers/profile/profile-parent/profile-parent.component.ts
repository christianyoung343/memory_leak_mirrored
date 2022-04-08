import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';
import { Question } from 'src/models/question';
import { User } from 'src/models/user';

@Component({
    selector: 'app-profile-parent',
    templateUrl: './profile-parent.component.html',
    styleUrls: ['./profile-parent.component.css']
})
export class ProfileParentComponent implements OnInit {
    @Input() public user!: User;
    @Input() public questions: Question[] = [];
    @Input() public userFirstLetter!: string;

    constructor(private us: UserService, private qs: QuestionService) { }

    ngOnInit(): void {
        this.us.getUser().subscribe(user => {
            if (user) {
                this.user = user;
                this.userFirstLetter = this.user.displayName.charAt(0);
            }
        });

        this.qs.getQuestions().subscribe(questions => {
            questions.forEach(q => {
               // console.log(this.user.uid);
                if (q.askerID == this.user.uid) {
                    this.questions.push(q);
                }
            })
        });
    }

}

