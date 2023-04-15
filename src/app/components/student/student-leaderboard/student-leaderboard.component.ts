import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {user,event,issue} from '../../../models/models'
import { StudentService } from 'src/app/services/student.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-student-leaderboard',
  templateUrl: './student-leaderboard.component.html',
  styleUrls: ['./student-leaderboard.component.scss']
})
export class StudentLeaderboardComponent implements OnInit {

  users!:user[];
  constructor(
    private service:StudentService,
    private userService:UserServiceService,

  ) { }

  ngOnInit(): void {
    this.userService.authenticate();
    this.getLaederBoardDetails();
  }

  getLaederBoardDetails(){
    this.service.getLeaderBoardDetails().subscribe(res=>{
      if(res.success){
        this.users=res.data;
      }
    })
  }
}
