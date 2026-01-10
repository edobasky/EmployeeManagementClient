import { Component, inject, OnInit, signal } from '@angular/core';
import { DesignationListModel, DesignationModel } from '../../models/Designation.Model';
import { Master } from '../../services/master';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { DepartmentModel } from '../../models/Department.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-designation',
  imports: [ReactiveFormsModule,AsyncPipe],
  templateUrl: './designation.html',
  styleUrl: './designation.css',
})
export class Designation implements OnInit {
  newDesigObj : DesignationModel = new DesignationModel();
  newDesigObj2 : DesignationListModel = new DesignationListModel();
  masterService = inject(Master);
  fb = inject(FormBuilder);

  designationForm! : FormGroup;
  $designationList: Observable<DesignationListModel[]> = new Observable<DesignationListModel[]>();
  departmentList: DepartmentModel[] = [];

  isEditMode: boolean = false;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.createForm();
    this.loadDepartments();
    this.loadDesignations();
    
  }

  // ===============================
  // FORM CREATION
  //=================================
  createForm() {
    this.designationForm = this.fb.group({
      designationId : [0],
      departmentId : [0, Validators.required],
      designationName: ['',Validators.required]
    })
  }

  // ==============================
  //  LOAD DEPARTMENTS (DROPDOWN)
  // ==============================
  loadDepartments() {
    this.masterService.getAllDept().subscribe((res : any) => {
      this.departmentList = res;
    });
  }

  loadDesignations() {
    this.$designationList = this.masterService.getAllDesignation()
  }
  
  // =========================
  // SAVE / UPDATE DESIGNATION
  // =========================
  onSave() {
    if (this.designationForm.invalid) {
      alert('Please fill all required fields');
      return;
    }

    const formValue = this.designationForm.value;

    if (this.isEditMode) {
      // UPDATE
      this.masterService.updateDesignation(formValue).subscribe(() => {
        alert("Designation Updated Sucessfully");
        this.loadDesignations();
        this.resetForm();
      })
    }else {
      // SAVE
      this.masterService.saveDesignation(formValue).subscribe(() => {
        alert('Designation Saved Successfully');
        this.loadDesignations();
        this.resetForm()
      })
    }
  }

  // ================================
  // EDIT DESIGNATION
  // ===============================
  onEdit(item: DesignationModel) {
    this.isEditMode = true;
    this.designationForm.patchValue({
      designationId: item.designationId,
      departmentId: item.departmentId,
      designationName : item.designationName

    })
  }

  // =========================
  //  DELETE DESIGNATION 
  // =========================
  onDelete(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete?.');

    if (confirmDelete) {
      this.masterService.deleteDesignation(id).subscribe(() => {
        alert('Designation Deleted Successfully.');
        this.loadDesignations();
      })
    }
  }

  // =============================
  // RESET FORM
  // ============================
  resetForm() {
    this.isEditMode = false;
    this.designationForm.reset({
      designationId : 0,
      departmentId : 0,
      designationName: ''
    })
  }

  // designationList = signal<DesignationModel[]>([]);


  // getAllDesignation() {
  //   debugger;
  //   this.masterService.getAllDesignation().subscribe({
  //     next:(result : any) => {
  //       this.designationList.set(result)
  //     }
  //   })
  // }
}
