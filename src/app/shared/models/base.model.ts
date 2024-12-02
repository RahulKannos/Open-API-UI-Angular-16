export class BaseModel {
  id: string;
  createdOn: Date;
  modifiedOn: Date | null;
  createdBy: string;
  modifiedBy: string;
  status: boolean;
  constructor() {
    this.id = '';
    this.createdOn = new Date();
    this.modifiedOn = null;
    this.createdBy = '';
    this.modifiedBy = '';
    this.status = true;
  }
}
