import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable, fromEvent } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() public uServ!: UserService;
  @Input() public isScreenSmall: boolean = false;
  @Input() public navCollapsed: boolean = true;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.uServ = this.userService;

    const checkScreenSize = () => document.body.clientWidth < 990;
    fromEvent(window, 'resize').subscribe(() => this.isScreenSmall = checkScreenSize());

  }

  toggleNavCollapsed(): void {
    console.log("Was "+ this.navCollapsed)
    this.navCollapsed = !this.navCollapsed;
    console.log("Now "+ this.navCollapsed)
  }

}
