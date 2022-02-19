//TODO: fix NullInjectionError somehow

import { Component, OnInit } from '@angular/core';
import { QuestionCreationService } from 'src/app/services/question-creation.service'

@Component({
  selector: 'app-question-creation-parent',
  templateUrl: './question-creation-parent.component.html',
  styleUrls: ['./question-creation-parent.component.css']
})
export class QuestionCreationParentComponent implements OnInit {
  private creationService: QuestionCreationService;

  constructor(private qcs: QuestionCreationService) { 
    this.creationService = qcs;
  }

  ngOnInit(): void {
  }

}
