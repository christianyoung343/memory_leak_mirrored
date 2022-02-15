import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() public questions:Question[] = [];
  constructor(private questionsService: QuestionService) { }

  ngOnInit(): void {
    this.questionsService.getQuestions().subscribe(q => {
      this.questions = q;
      console.log(this.questions);
    });
  }

  alertFunction() : void {
    alert("This came from the TS");
  }
  
}
