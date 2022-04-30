import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticateService implements CanActivate {

	constructor(private userService: UserService, private router: Router) { }

	canActivate(): Observable<boolean> {
		return this.userService.user$.pipe(
			take(1), map(userObj => !!userObj), tap(login => {
				if (!login) {
					console.log('Not Logged In. Access Denied')
					this.router.navigate(['/'])
				}
			})
		);
	}
}
