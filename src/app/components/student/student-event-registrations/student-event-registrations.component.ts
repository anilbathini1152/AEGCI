import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserServiceService } from 'src/app/services/user-service.service';
import { user, event, issue, eventuser } from '../../../models/models'
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-event-registrations',
  templateUrl: './student-event-registrations.component.html',
  styleUrls: ['./student-event-registrations.component.scss']
})
export class StudentEventRegistrationsComponent implements OnInit {

  public dialogRef!: any;

  constructor(
    public dialog: MatDialog,
    private userService: UserServiceService,
    private service: StudentService,
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
    score: 0
  }

  eventRegTemplate: eventuser = {
    user: this.userTemplate,
    event: this.eventTemplate,
  }

  emptyTemplate: eventuser = {
    user: this.userTemplate,
    event: this.eventTemplate,
  }


  selectedFile!:File;
  regs: eventuser[] = []
  adminUsers: user[] = []
  studentUsers: user[] = []
  authorityUsers: user[] = []
  events: event[]=[]
  currentUser!: user;
  selectedEventReg!:eventuser;
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
    this.service.getEvetRegistration().subscribe(res => {
      if (res.success) {
        this.regs = res.data
      }
    })
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  onUpload(reg:any){
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    
    this.service.upload(formData).subscribe(res=>{
      if(res.success){
        let params={
          event:reg.event._id,
          user:reg.user._id,
          path:res.data
        }
        this.service.completeTask(params).subscribe(res=>{
          if(res.success){
            alert(res.message)
            this.getEventRegs();
          }
        })
      }
    })
  }

  setTemplateForFileUpload(evnetReg:eventuser){
    this.eventRegTemplate=evnetReg
  }

  completeEvent(reg:eventuser){
    
  }

  
}
