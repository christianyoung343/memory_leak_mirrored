import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public questions: Question[] = [];
  public uid: string | any;
  
  @Input() public question: Question | any;

  constructor(private questionsService: QuestionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.uid = (params.get('id'));
      console.log("Question UID: " + this.uid);
      console.log(typeof this.uid);
    });

    this.questionsService.getQuestions().subscribe(q => {
      this.questions = q;
      console.log(typeof this.uid);
      for(let i = 0; i<this.questions.length;i++){
        if(this.questions[i].uid ===this.uid){
          this.question = this.questions[i];
        }
      }
      console.log(this.questions);
      console.log(this.question.title);
    });

    

    // let questionMatches = this.questions.filter(q => { return (q.uid == this.uid) })

    // if (questionMatches.length > 0) {
    //   this.question = questionMatches[0];
    // }
  }

  alertFunction(): void {
    if (this.question) {
      if (this.question.flag > 0) {
        alert("This question has already been flagged. A moderator will review it as soon as possible.")
      } else {
        var response = null
        do {
          response = prompt("Enter the reason for flagging (1-4):\n  1. Question is rude/inappropriate\n  2. Question encourages academic misconduct\n  3. Question has been answwered previously\n  4. An answer for this question is rude, inappropriate, and/or encourages academic misocnduct\n");

          const valid_responses = [1, 2, 3, 4];
          var invalid = true;
          try {
            invalid = !(valid_responses.includes(Number(response)));
          } catch {
            invalid = true;
          }
        } while (invalid && response);
        if (response) {
          this.question.flag = Number(response);
          //FIXME: does this update stored version?
        }
      }
    }

  }

  showUID(): void {
    console.log(this.uid);
  }

}
