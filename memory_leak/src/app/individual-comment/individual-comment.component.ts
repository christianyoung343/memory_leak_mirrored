import { Component, Input, OnInit } from '@angular/core';
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
    
    constructor(private us: UserService) { }

    ngOnInit(): void {
        if (this.comment) {
            this.text = this.comment.comment;
            this.us.getNameById(this.comment.userID).then(name => { this.displayName = name });
        }
    }

}
