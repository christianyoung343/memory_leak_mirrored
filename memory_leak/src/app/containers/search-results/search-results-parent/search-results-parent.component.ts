import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/models/question';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Component({
	selector: 'app-search-results-parent',
	templateUrl: './search-results-parent.component.html',
	styleUrls: ['./search-results-parent.component.css']
})
@Injectable()
export class SearchResultsParentComponent implements OnInit {

	public allQuestions: Array<Question> = [];
	@Input() public filteredQuestions: Array<Question> = [];
	public searchForm: FormGroup;
	public keywords: Array<string> = [];

	constructor(private qs: QuestionService, private router: Router, private http: HttpClient) {
		this.searchForm = new FormGroup ({
			term: new FormControl(""),
			inputAnswered: new FormControl(false)
		  })
		  http.get("assets/commonWords.txt", {responseType: 'text'}).subscribe(data => {
			this.keywords = data.split('\n');
		  })
	 }

	ngOnInit(): void {
		this.qs.getQuestions().subscribe( quests => {
			this.allQuestions = quests;
		})
	}


	searchQuestions(searchTerm: { term:string, inputAnswered: Boolean}){
		let finalizedTerms: Array<string> = [];
		let userTerm = searchTerm.term.split(' ');
		userTerm.forEach( word => {
			if(!this.keywords.includes(word) && !finalizedTerms.includes(word)){
				finalizedTerms.push(word);
			}
		});
		console.log(finalizedTerms)
		this.filteredQuestions = [];
		for(let i = 0; i < this.allQuestions.length; ++i){
			if(this.allQuestions[i].title.toLowerCase().includes(searchTerm.term.toLowerCase())){
				this.filteredQuestions.push(this.allQuestions[i]);
			}
		}
	}

}
