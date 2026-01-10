import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DepartmentModel } from '../models/Department.model';
import { DesignationListModel, DesignationModel } from '../models/Designation.Model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Master {
  private apiUrl: string = 'http://localhost:5009/api/';
  private http = inject(HttpClient);
// ==================DEPARTMENT SERVICE=================>
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

  // =====================DESIGNATION=======================>
  getAllDesignation() : Observable<DesignationListModel[]> {
    return this.http.get<DesignationListModel[]>(`${this.apiUrl}DesignationMaster`);
  }

   getDesignation(id : number) {
    return this.http.get(`${this.apiUrl}DesignationMaster/${id}`);
  }

    saveDesignation(obj : DesignationModel) {
    return this.http.post(`${this.apiUrl}DesignationMaster`,obj);
  }

  updateDesignation(obj : DesignationModel) {
     return this.http.put(`${this.apiUrl}DesignationMaster/${obj.designationId}`,obj);
  }

  deleteDesignation(id : number) {
    return this.http.delete(`${this.apiUrl}DesignationMaster/${id}`);
  }


}
