import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { user, event, issue, eventuser } from '../../../models/models'

@Component({
  selector: 'app-admin-event-registrations',
  templateUrl: './admin-event-registrations.component.html',
  styleUrls: ['./admin-event-registrations.component.scss']
})
export class AdminEventRegistrationsComponent implements OnInit {

  public dialogRef!: any;

  constructor(
    public dialog: MatDialog,
    private userService: UserServiceService,
    private adminService: AdminServiceService,
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
    this.getAdminUsers();
    this.getAuthorityUsers();
    this.getStudentUsers();
    this.getCurrentUser();
  }

  getEvents(){
    this.adminService.getEvents().subscribe((res) => {
      if (res.success) {
        this.events = res.data
      }
    })
  }
  getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('user') || "")
  }
  getAdminUsers() {
    this.adminService.getAdminUsers().subscribe((res) => {
      if (res.success) {
        this.adminUsers = res.data
      }
    })
  }
  getStudentUsers() {
    this.adminService.getStudentUsers().subscribe((res) => {
      if (res.success) {
        this.studentUsers = res.data
      }
    })
  }
  getAuthorityUsers() {
    this.adminService.getAuthorityUsers().subscribe((res) => {
      if (res.success) {
        this.authorityUsers = res.data
      }
    })
  }

  getEventRegs() {
    this.regs = [];
    this.adminService.getEventRegistration().subscribe(res => {
      if (res.success) {
        this.regs = res.data
        console.log(this.regs)
      }
    })
  }

  createEventReg(reg: any) {
    this.adminService.addEventRegistration(reg).subscribe(res => {
      this.eventRegTemplate = this.emptyTemplate
      if (res.success) {
        alert(res.message)
        this.regs = []
        this.getEventRegs()
      }
      else {
        alert(res.message)
      }
    })
  }

  editEventReg(reg: any) { 
    this.adminService.updateEventRegistration(reg).subscribe(res => {
      this.eventRegTemplate = this.emptyTemplate
      if (res.success) {
        alert(res.message)
        this.regs = []
        this.getEventRegs()
      }
      else {
        alert(res.message)
      }
    })
  }

  setEventRegDetailstoedit(reg: eventuser) {
    this.eventRegTemplate = reg;
  }

  setDeleteEvntReg(reg: any) {
    this.eventRegTemplate = reg;
  }

  deleteIssue(reg: any) {
    const params = {
      regId: reg._id
    }
    console.log(params)
    this.adminService.deleteEventRegistration(params).subscribe(res => {
      if (res.success) {
        this.regs = []
        this.getEventRegs();
        alert(res.message)
      }
      else {
        alert(res.message)
      }
    })
  }

}
