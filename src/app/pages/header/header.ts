import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive, Router } from "@angular/router";
import { EmployeeModel } from '../../models/Employee.model';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterOutlet, NgIf, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
 router = inject(Router);
  sidebarOpen = true;
  loggedEmpData: EmployeeModel = new EmployeeModel();

  constructor() {
    const localData = localStorage.getItem('empLoginUser');
    if (localData != null) {
      this.loggedEmpData = JSON.parse(localData);
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

   onLogOff() {
    localStorage.removeItem('empLoginUser');
    this.router.navigateByUrl("/login");
  }
}
