export interface PartListDetail {
  prtCode: string;
  prtName: string;
  price: number;
  currency: string;
}

export interface AddPMStandard {
  mdCode: string;
  pmType: string;
  pmShot?: number;
  pmAlrtshot?: number;
  pmPeriod?: number;
  pmAlrtperiod?: number;
  pmExplain?: string;
  pmCost: number;
  // Detail
  seq: number;
  pmMethod?: string;
  pmDetail?: string;
  prtCode?: string;
  prtQty?: number;
  um?: string;
  unitPrice: number;
  amount: number;
  remark: string;
  empcode: string;
}


export interface AddPMSTDPayload {
  standard: AddPMStandard;
  details: AddPMStandard[];
}


export interface PMPlanForm {
  mdCode: string;
  mdName: string;
  std_ID: string;
  startDate: string;
  endDate: string;
  pmType: string;
  value: string;
  alertValue: string;
  pmExplain: string;
  pmCost: string;
}


export interface PMSavePayload {
  mdCode: string;         
  mdname: string;          
  pmS_ID: string;          
  strDate: string;        
  endDate: string;        
  pmType: string;          
  pmValue: string;         
  pmAlertValue: string;    
  empcode: string;        
  schedule: PMSchedule[];
}

export interface PMSchedule {
  mdCode: string;
  pmPlanDate: string;       
  pmPlanAlertDate: string;  
  pmCost: string;           
  scheduledetails: PMScheduleDetail[];
}

export interface PMScheduleDetail {
  pmMethod: string;       
  prt_Code: string;       
  prt_Qty: number;        
  unit_Price: number;     
  amount: number;         
  remark: string;       
}