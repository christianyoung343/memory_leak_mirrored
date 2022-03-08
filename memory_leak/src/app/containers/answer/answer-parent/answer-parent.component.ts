import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/models/answer';

@Component({
  selector: 'app-answer-parent',
  templateUrl: './answer-parent.component.html',
  styleUrls: ['./answer-parent.component.css']
})
export class AnswerParentComponent implements OnInit {

  @Input() answers!: Answer[];
//  @Input() answers!: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
