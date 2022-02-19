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

  alertFunction(questionUID: string) : void {
    //FIXME: Make the question refer to a single question
    var questionMatches = this.questions.filter(q => {return (q.uid == questionUID)})
    var question;
    console.log(questionMatches)
    if (questionMatches.length > 0) {
      question = questionMatches[0]
    } else {
      alert("Error: Invalid question")
      return
    }
    if (question.flag > 0) {
      alert("This question has already been flagged. A moderator will review it as soon as possible.")
    } else {
      var response = null
      do {
        response = prompt("Enter the reason for flagging (1-4):\n  1. Question is rude/inappropriate\n  2. Question encourages academic misconduct\n  3. Question has been answwered previously\n  4. An answer for this question is rude, inappropriate, and/or encourages academic misocnduct\n");
        
        const valid_responses = [1,2,3,4];
        var invalid = true;
        try {
          invalid = !(valid_responses.includes(Number(response)));
        } catch {
          invalid = true;
        }
      } while (invalid && response);
      if (response) {
        question.flag = Number(response);
        //FIXME: does this update stored version?
      }
    }
  }
  
}
