export class EmployeeModel {
  employeeId: number;
  name: string;
  contactNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  altContactNo?: string;
  address: string;
  createdDate: Date;
  modifiedDate: Date;
  role: string;
  designationId: number;

  constructor() {
    this.employeeId = 0;
    this.name = "";
    this.contactNo = "";
    this.email = "";
    this.city = "";
    this.state = "";
    this.pincode = "";
    this.address = "";
    this.designationId = 0;
    this.role = "";
    this.createdDate = new Date();
    this.modifiedDate = new Date();
    this.altContactNo = "";
  }
}

export interface IEmployeeListModel {
  employeeId: number;
  name: string;
  contactNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  altContactNo?: string;
  address: string;
  createdDate: string;
  modifiedDate: string;
  role: string;
  designationId: number;
  designationName: string;
  departmentName: string;
}

