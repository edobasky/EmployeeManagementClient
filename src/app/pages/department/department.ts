import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { DepartmentModel } from '../../models/Department.model';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-department',
  imports: [FormsModule, NgClass],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {
  newDepObj: DepartmentModel = new DepartmentModel();
  masterService = inject(Master);
  //  deptList: DepartmentModel[] = [];
  deptList = signal<DepartmentModel[]>([]);

  ngOnInit(): void {
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.masterService.getAllDept().subscribe({
      next: (result: any) => {
        // debugger;
        console.log(result);
        this.deptList.set(result);
      },
    });
  }

  onSaveDept() {
    debugger;
    this.newDepObj.departmentName.toUpperCase;
    this.masterService.saveDept(this.newDepObj).subscribe({
      next: (result: any) => {
        //  debugger;
        this.getAllDepartments();
        alert('Department created sucessfully!');
      },
      error: (error) => {
        debugger;
        alert(error.error);
      },
    });
  }
}
