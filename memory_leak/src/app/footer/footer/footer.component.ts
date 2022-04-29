import { Component, Input, OnInit } from '@angular/core';

import { User } from 'src/models/user';

import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
	@Input() user!: User;

	constructor(private userService: UserService) { }

	ngOnInit(): void {
		this.userService.getUser().subscribe(user => {
			if (user) {
				this.user = user;
			}
		});
	}
}
