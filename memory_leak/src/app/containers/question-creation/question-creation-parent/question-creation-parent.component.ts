import { Component, InjectionToken, Injector, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { QuestionCreationService } from 'src/app/services/question-creation.service';
import { Question } from 'src/models/question';

@Component({
  selector: 'app-question-creation-parent',
  templateUrl: './question-creation-parent.component.html',
  styleUrls: ['./question-creation-parent.component.css']
})
export class QuestionCreationParentComponent implements OnInit {
  @Input()
  source!: InjectionToken<QuestionCreationService>;
  private qcs!: QuestionCreationService;
  questionForm: any;

  constructor(private injector: Injector) {
     this.questionForm = new FormGroup ({
      title: new FormControl(""),
      body: new FormControl(""),
      anonymous: new FormControl(false)
    })
  }

  ngOnInit() {
    this.qcs = this.injector.get<QuestionCreationService>(this.source);
    
  }

  onSubmit(data: any) {
    //TODO pass in data to addQuestion + get askerID
    console.log("title: " + data.title + "\nbody: " + data.body + "\nanonymous?: " + data.anonymous);
  }

  addQuestion(question: Question) {
    this.qcs.addQuestion(question);
  }
}
