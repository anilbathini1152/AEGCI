import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-authority-dashboard',
  templateUrl: './authority-dashboard.component.html',
  styleUrls: ['./authority-dashboard.component.scss']
})
export class AuthorityDashboardComponent implements OnInit {

  constructor(
    private userService:UserServiceService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.userService.authenticate()
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['/login'])
  }
}
