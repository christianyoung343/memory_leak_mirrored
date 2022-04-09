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
		this.searchForm = new FormGroup({
			term: new FormControl(""),
			inputAnswered: new FormControl(false)
		})
		http.get("assets/commonWords.txt", { responseType: 'text' }).subscribe(data => {
			this.keywords = data.split('\n');
		})
	}

	ngOnInit(): void {
		this.qs.getQuestions().subscribe(quests => {
			this.allQuestions = quests;
		})
	}

	cleanQuestions(list: Array<string>): Array<string> {
		let newList: Array<string> = [];
		list.forEach(str => {
			let newStr = "";
			for (let i = 0; i < str.length; i++) {
				if (str.charAt(i).match(RegExp("[a-zA-Z0-9]"))) {
					newStr += str.charAt(i);
				}
			}
			if (!newList.includes(newStr)) {
				newList.push(newStr.toLowerCase());
			}
		})
		return newList;
	}

	searchQuestions(searchTerm: { term: string, inputAnswered: Boolean }) {
		let finalizedTerms: Array<string> = []; // List of cleaned search terms
		let userTerm = this.cleanQuestions(searchTerm.term.split(' '));
		userTerm.forEach(word => {
			if (!this.keywords.includes(word) && !finalizedTerms.includes(word)) {
				finalizedTerms.push(word);
			}
		});
		this.filteredQuestions = [];
		let intersectionKV: Array<{ index: number, numIntersections: number }> = [];
		for (let i = 0; i < this.allQuestions.length; ++i) {
			let cleanTitle = this.cleanQuestions(this.allQuestions[i].title.split(' ')); // Question title after clean
			let intersection: Array<string> = finalizedTerms.filter(fTerm => cleanTitle.includes(fTerm));
			if (searchTerm.inputAnswered && !this.allQuestions[i].acceptedAnswerID) {
				continue;
			}
			intersectionKV.push({ index: i, numIntersections: intersection.length });
		}
		intersectionKV.sort((a, b) => b.numIntersections - a.numIntersections);
		let j = 0;
		for (let i = finalizedTerms.length; i >= 1; --i) {
			for (; j < intersectionKV.length; j++) {
				if (intersectionKV[j].numIntersections >= i) {
					this.filteredQuestions.push(this.allQuestions[intersectionKV[j].index]);
				}
				else {
					break;
				}
			}
		}
	}

}
