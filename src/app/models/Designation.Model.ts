export class DesignationModel {
    designationId: number;
  departmentId: number;
  designationName: string;

  constructor() {
    this.designationId = 0;
    this.departmentId = 0;
    this.designationName = "";
  }
}

export class DesignationListModel {
  designationId: number;
  departmentId: number;
  designationName: string;
  departmentName: string;
  constructor() {
    this.designationId = 0;
    this.departmentId = 0;
    this.designationName = "";
    this.departmentName = "";
  }
}