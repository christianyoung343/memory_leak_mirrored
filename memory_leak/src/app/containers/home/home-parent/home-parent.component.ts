import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';
import { Question } from 'src/models/question';

@Component({
  selector: 'app-home-parent',
  templateUrl: './home-parent.component.html',
  styleUrls: ['./home-parent.component.css']
})
export class HomeParentComponent implements OnInit {
  @Input() public uServ!: UserService
  @Input() public questions: Question[] = [];
    public allQuestions: Question[] = [];
  constructor(private userService:UserService, private router: Router, private qs: QuestionService) { }

  ngOnInit(): void {
    this.uServ = this.userService;
    this.qs.getQuestions().subscribe(q => {
      this.allQuestions = q;
      this.questions = this.allQuestions.filter(q => q.acceptedAnswerID === "");
    });
  }

  goToSignUp(){
    this.router.navigate(['signup']);
  }

}
