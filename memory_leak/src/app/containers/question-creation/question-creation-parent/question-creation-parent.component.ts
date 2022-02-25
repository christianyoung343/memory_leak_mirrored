import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { QuestionCreationService } from 'src/app/services/question-creation.service';
import { UserService } from 'src/app/services/user.service';
import { Question } from 'src/models/question';
import { User } from 'src/models/user';

@Component({
  selector: 'app-question-creation-parent',
  templateUrl: './question-creation-parent.component.html',
  styleUrls: ['./question-creation-parent.component.css']
})
export class QuestionCreationParentComponent implements OnInit {
  @Input()
  //private qcs!: QuestionCreationService;
  questionForm: any;
  user: any;

  constructor(private qcs: QuestionCreationService, private us: UserService) {
      this.questionForm = new FormGroup ({
      title: new FormControl(""),
      body: new FormControl(""),
      anonymous: new FormControl(false)
    })
  }

  ngOnInit() {
    //this.qcs = this.injector.get<QuestionCreationService>(this.source);
    this.us.getUser().subscribe(u => {
      this.user = u;
    })
  }

  addQuestion(data: any) {
   //this.questionForm = data;

    let question: Question = {
      //TODO get user id for askerID
      acceptedAnswerID: '',
      anonymous: data.anonymous,
      askerID: this.user.uid,
      body: data.body,      
      comments: [],
      flag: 0,
      title: data.title,
      uid: ''
    };

    console.log(question);
    this.qcs.addQuestion(question);
    //console.log(this.user.uid);
    //his.qcs.addQuestion(question);
  }
}
