import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/models/answer';
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

  constructor(private us: UserService) { }

  ngOnInit(): void {
    this.text = this.answer.body;
    this.us.getNameById(this.answer.answererID).then(name => {this.displayName = name});
  }

}
