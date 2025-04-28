export type RawDocument = {
  documentCategory: string;
  documentName: string;
  receivedDate: string;
  trackingId: number;
  fileId: number;
};


export interface CaseRow {
  title: string;
  case: string;
  type: string;
  subType: string;
  dateFiled: string;
  status: string;
  statusDate: string;
  documents: RawDocument[];
  parties: {
    appellant: string;
    respondant: string;
  };
  contacts?: {
    firstName: string;
    lastName: string;
    contactType: string;
    country: string | number;
    city: string;
    addressLine1: string;
    addressLine2: string;
    state: string | number;
    usPhone: string;
  }[];
}

export interface APIResponse {
  businessUnit: string;
  totalHours: string;
  workflowStatus: string;
  description: string | null;
  coCounselor: string;
  threadParentId: string;
  updatedDate: string;
  caseType: string;
  deadlineDays: string;
  caseNumber: string;
  subjectMatter: string;
  state: string;
  deadline: string;
  receivedDate: string;
  createdById: string;
  updatedBy: string;
  clientDueDate: string;
  sensitiveData: string;
  updatedById: string;
  processingTime: string;
  processingStatus: string | null;
  totalAmount: string;
  createdDate: string;
  createdBy: string;
  deletedDate: string;
  workflowState: string;
  attorney: string;
  organization: string;
}

export interface Comment {
  fname: string;
  lname: string;
  text: string;
  date: string;
  email: string;
  town: string;
  id: string;
  status?: string;
}

export interface Event {
  id: string;
  date: string;
  time?: string;
  endtime?: string;
  title: string;
  info: string;
  location: string;
  caseNumber?: string;
  matter?: string;
}