import { Component, inject } from '@angular/core';
import { EmployeeModel } from '../../models/Employee.model';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee-service';
import { Observable } from 'rxjs';
import { DesignationListModel } from '../../models/Designation.Model';
import { Master } from '../../services/master';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule,AsyncPipe],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm {
  newEmployeeObj : EmployeeModel = new EmployeeModel();
  employeeService = inject(EmployeeService);
  masterServ = inject(Master);
  $designationList: Observable<DesignationListModel[]> = new Observable<DesignationListModel[]>();
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);

  loggedEmpData: EmployeeModel = new EmployeeModel();


  constructor() {

    const localData = localStorage.getItem('empLoginUser');
    if (localData != null) {
      this.loggedEmpData = JSON.parse(localData);
    }

    this.activeRoute.params.subscribe((res : any) => {
        const id = Number(res.id);
        debugger;
        if (id !== 0) {
          this.newEmployeeObj.employeeId = res.id;
          this.getEmpById();
        }
    })
    this.$designationList = this.masterServ.getAllDesignation();
  }
   

  getEmpById() {
    this.employeeService.getAllEmployeeById(this.newEmployeeObj.employeeId).subscribe( {
      next : (result) => {
        this.newEmployeeObj = result
        this.newEmployeeObj.employeeId = Number(this.newEmployeeObj.employeeId);
      }
    })
  }

  onSaveEmp() {
    debugger;
   this.employeeService.saveEmployee(this.newEmployeeObj).subscribe({
    next: (result) => {
        alert("Employee Created!");
        this.newEmployeeObj = new EmployeeModel();
    },
    error: (error) => {
        alert(error.error)
    }
   })
  }

  onUpdate() {
    debugger;
    this.employeeService.updateEmployee(this.newEmployeeObj).subscribe({
      next: (result) => {
          alert("Employee Updated!");
          this.router.navigateByUrl("employee-list");
      },
      error: (error) => {
          alert(error.error)
      }
     })
  }
}
