import { Component, Input, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	@Input() uServ!: UserService;
	@Input() isScreenSmall: boolean = false;
	@Input() navCollapsed: boolean = true;

	constructor(private userService: UserService) { }

	ngOnInit(): void {
		this.uServ = this.userService;

		const checkScreenSize = () => document.body.clientWidth < 990;
		fromEvent(window, 'resize').subscribe(() => this.isScreenSmall = checkScreenSize());

	}

	toggleNavCollapsed(): void {
		console.log("Was " + this.navCollapsed);
		this.navCollapsed = !this.navCollapsed;
		console.log("Now " + this.navCollapsed);
	}

}
