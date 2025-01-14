export interface CaseRow {
  title: string;
  case: string;
  type: string;
  subType: string;
  dateFiled: string;
  status: string;
  statusDate: string;
  parties: {
    appellant: string;
    respondant: string;
  };
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
  title: string;
  info: string;
  location: string;
  caseNumber?: string;
}