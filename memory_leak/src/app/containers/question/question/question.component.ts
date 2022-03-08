import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionService } from 'src/app/services/question.service';
import { Answer } from 'src/models/answer';
import { Question } from 'src/models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public questions: Question[] = [];
  public uid: string | any;
  public allAnswers : Answer[] = [];

  @Input() public question!: Question;
  @Input() public comments!: [string,string][][];
  //@Input() public answers!: Answer[];
  @Input() public answers: Answer[]= [];

  constructor(private questionsService: QuestionService, private answerService:AnswerService, private route: ActivatedRoute) { }

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
          this.comments = this.question.comments;
        }
      }
 //     console.log(this.questions);
 //     console.log(this.question.title);
    });

    this.answerService.getAnswers().subscribe(a => {
      this.allAnswers = a;
      console.log(this.allAnswers.length);
    //  console.log(this.question.uid);
      for(let j = 0; j<this.allAnswers.length; j++){
        console.log(this.allAnswers[j].uid);
        console.log(this.question.acceptedAnswerID);
        console.log(typeof this.answers);
        if(this.allAnswers[j].uid == this.question.acceptedAnswerID){
          this.answers.push(this.allAnswers[j]);
          console.log(this.allAnswers);
        }
      }
      console.log(this.answers);
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
          this.questionsService.updateQuestion(this.question.uid, this.question)
        }
      }
    }

  }

  showUID(): void {
    console.log(this.uid);
  }

}
