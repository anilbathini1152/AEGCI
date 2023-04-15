import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthorityService } from 'src/app/services/authority.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { user, event, issue, eventuser } from '../../../models/models';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-authority-events-registration',
  templateUrl: './authority-events-registration.component.html',
  styleUrls: ['./authority-events-registration.component.scss']
})
export class AuthorityEventsRegistrationComponent implements OnInit {

  public dialogRef!: any;
  img="C:/Users/Inncircles/Desktop/Practice/AEGCI/AEGCI/uploads/"

  constructor(
    public dialog: MatDialog,
    private userService: UserServiceService,
    private service: AuthorityService,
    private sanitizer: DomSanitizer
  ) { }

  userTemplate: user = {
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    role: "",
    mobileNo: "",
    gender: "",
    password: "",
    score: 0
  };

  eventTemplate: event = {
    name: "",
    description: "",
    type: "",
    place: "",
    date: null,
    amount: 0,
    organiser: this.userTemplate,
    score: 0,
  }

  eventRegTemplate: eventuser = {
    user: this.userTemplate,
    event: this.eventTemplate,
    url:''
  }

  emptyTemplate: eventuser = {
    user: this.userTemplate,
    event: this.eventTemplate,
    url:""
  }


  selectedEventReg:eventuser=this.emptyTemplate;
  regs: eventuser[] = []
  adminUsers: user[] = []
  studentUsers: user[] = []
  authorityUsers: user[] = []
  events: event[]=[]
  currentUser!: user;
  ngOnInit(): void {
    this.userService.authenticate()
    this.getEventRegs();
    this.getEvents();
    this.getCurrentUser();
  }

  getEvents(){
    this.service.getEvents().subscribe((res) => {
      if (res.success) {
        this.events = res.data
        
      }
    })
  }
  getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('user') || "")
  }


  getEventRegs() {
    this.regs = [];
    this.service.getEventRegistration().subscribe(res => {
      if (res.success) {
        this.regs = res.data
        // for(let reg of this.regs){
        //   reg.url= this.img+(reg.url??"")
        // }
      }
    })
  }

  verifyReg(reg:eventuser){
    reg.state="VERIFIED",
    reg.verifiedAt=new Date(Date.now())
    this.service.changeEventRegStatus(reg).subscribe(res=>{
      if(res.success){
        alert(res.message);
        this.getEventRegs();
      }
      
    })

  }
  setImageToView(reg:any){
    this.selectedEventReg=reg
  }

  rejectReg(reg:eventuser){
    reg.state="REJECTED",
    this.service.changeEventRegStatus(reg).subscribe(res=>{
      if(res.success){
        alert(res.message);
        this.getEventRegs();
      }
    })
  }


}
