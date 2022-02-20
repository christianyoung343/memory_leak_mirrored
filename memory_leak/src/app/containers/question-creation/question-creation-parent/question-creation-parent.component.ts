//TODO: fix NullInjectionError somehow

import { Component, InjectionToken, Injector, Input, OnInit } from '@angular/core';
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

  constructor(private injector: Injector) {
     
  }

  ngOnInit() {
    this.qcs = this.injector.get<QuestionCreationService>(this.source);
  }

  addQuestion(question: Question) {
    this.qcs.addQuestion(question);
  }
}
