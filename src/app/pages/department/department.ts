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

  onEdit(data : DepartmentModel) {
    const strData = JSON.stringify(data);
    const parseData = JSON.parse(strData);
    // the above code meant to destroy the effect of ngmodel two way binding when doing edit.change parseData to data below to see why.
    this.newDepObj = parseData;
  }

  onReset() {
    this.newDepObj = new DepartmentModel();
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

  // ================= UPDATE DEPT ===============
  onUpdateDept() {
    debugger;
    console.log(this.newDepObj);
    this.masterService.updateDept(this.newDepObj).subscribe({
      next : (result : any) => {
        this.getAllDepartments();
        alert('Department update successfully!');
      },
      error : (error) => {
        debugger;
        alert(error.error);
      }
    })
  }

  // ================= DELETE DEPT ==================
  onDelete(id : number) {
    alert("Are you sure you want to delete this department");
    const isDelete = confirm("Are you sure you want to Delete");
    if (isDelete) {
       debugger;
    this.masterService.deleteDept(id).subscribe({
      next: (result : any) => {
        this.getAllDepartments();
        alert("Department deleted successfully");
      },
      error : (error) => {
        alert(error.error);
      }
    })
    }
  }

  // ==================SAVE DEPT =================
  onSaveDept() {
    debugger;
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
