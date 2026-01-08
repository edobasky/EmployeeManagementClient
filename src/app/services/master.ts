import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DepartmentModel } from '../models/Department.model';

@Injectable({
  providedIn: 'root',
})
export class Master {
  apiUrl: string = 'http://localhost:5009/api/';
  http = inject(HttpClient);

  getAllDept() {
    return this.http.get(`${this.apiUrl}DepartmentMaster/GetAllDepartments`);
  }

  saveDept(obj : DepartmentModel) {
    return this.http.post(`${this.apiUrl}DepartmentMaster/AddDepartment`,obj);
  }

  updateDept(obj : DepartmentModel) {
     return this.http.put(`${this.apiUrl}DepartmentMaster/UpdateDepartment`,obj);
  }

  deleteDept(id : number) {
    return this.http.delete(`${this.apiUrl}DepartmentMaster/RemoveDepartment/${id}`);
  }

}
