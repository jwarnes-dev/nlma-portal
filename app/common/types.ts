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