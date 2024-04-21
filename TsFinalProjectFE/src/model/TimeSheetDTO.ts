export interface TimeSheetDTO {
    id: number;
    
    fromDate: Date; 
    toDate: Date;
    note: string;
    status: string;
    userId: number;
    modifiedBy:string
    createdAt:Date;
}
  