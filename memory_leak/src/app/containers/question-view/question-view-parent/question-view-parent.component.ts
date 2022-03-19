import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/models/question';

@Component({
  selector: 'app-question-view-parent',
  templateUrl: './question-view-parent.component.html',
  styleUrls: ['./question-view-parent.component.css']
})
export class QuestionViewParentComponent implements OnInit {

  public questionObj: any;
  public uid: any;

  constructor(private qs: QuestionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(params => {
    //   this.uid = (params.get('id'));
    //   console.log("Question UID: " + this.uid);
    // });

    // this.qs.getQuestions().subscribe(q => {
    //   this.questionObj = q.filter(q => { return (q.uid == this.uid) })
    // });
    // console.log(this.questionObj);
  }

}
