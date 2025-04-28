import { useEffect, useState } from "react";
// import axios from "axios";
// import mockCases from "../mock/mock.cases.json"
import mockCases from "../mock/mock.cases-Dep.json"
import mockCasesDocs from "../mock/mock-cases-docs.json"
import { CaseRow, APIResponse } from "@common/types"
import { RawDocument } from "@/app/common/types";

interface UseFetchCaseDataReturn {
  data: CaseRow[] | null;
  loading: boolean;
  error: string | null;
}



type RawTask = {
  taskType: string;
  dueDate: string;
  status: string;
};

type RawCase = {
  subjectMatter: string;
  caseNumber: string;
  caseType: string;
  receivedDate: string;
  workflowStatus: string;
  updatedDate: string;
  documents: RawDocument[];
  tasks: RawTask[];
  contacts: {
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
};

type TransformedCase = {
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
  documents: RawDocument[];
  contacts: {
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
};

function transformCases(rawData: RawCase[]): TransformedCase[] {
  return rawData.map((entry) => {
    // Find most relevant task for statusDate (falling back to updatedDate if needed)
    const sortedTasks = entry.tasks
      .filter((task) => task.dueDate)
      .sort((a, b) => {
        const aDate = new Date(a.dueDate);
        const bDate = new Date(b.dueDate);
        return bDate.getTime() - aDate.getTime();
      });

    const latestTask = sortedTasks[0];

    return {
      title: entry.subjectMatter || "Unknown Title",
      case: entry.caseNumber || "Unknown Case Number",
      type: "Permit", // Assuming static value
      subType: getSubType(entry.caseType),
      dateFiled: formatDate(entry.receivedDate),
      status: entry.workflowStatus || "Unknown",
      statusDate: latestTask?.dueDate
        ? formatDate(latestTask.dueDate)
        : formatDate(entry.updatedDate),
      parties: {
        appellant: "Unknown Appellant", // You can update this logic if the data provides names
        respondant: "Unknown Respondant", // You can update this too
      },
      documents: entry.documents || [],
      contacts: entry.contacts || [],
    };
  });
}

// Example mapping for caseType -> subType
function getSubType(caseType: string): string {
  const map: { [key: string]: string } = {
    "23": "WDIV",
    "19": "AIR",
    "27": "WQ",
    "30": "PSD",
  };
  return map[caseType] || "GEN";
}

// Convert date from string like "Wed Apr 03 00:00:00 GMT 2024" or "MM-DD-YYYY" to "YYYY-MM-DD"
function formatDate(input: string): string {
  const parsed = new Date(input);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split("T")[0];
  }

  // fallback for MM-DD-YYYY
  const parts = input.split("-");
  if (parts.length === 3) {
    const [month, day, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  return "Invalid Date";
}

const casesEndpoint = 'http://localhost:3030/cases'

function useFetchCaseData(): UseFetchCaseDataReturn {
  const [data, setData] = useState<CaseRow[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData =  async () => {
      try {
        setLoading(true);
        // const response = await axios.get<APIResponse[]>(casesEndpoint);
        // console.log(response.data)

        // const mappedData:CaseRow[] = response.data.map(c => {
        //   return ({
        //     title: c.subjectMatter,
        //     case: c.caseNumber,
        //     status: c.workflowStatus,
        //     parties: {
        //       appellant: "",
        //       respondant: ""
        //     },
        //     statusDate: c.updatedDate,
        //     subType: "",
        //     type: "",
        //     dateFiled: c.createdDate
        //   })
        // })
        const transformedCases = transformCases(mockCasesDocs);
        console.log("transform", transformedCases)
        const fresponse: CaseRow[] = transformedCases

        // setData(mappedData);
        setData(fresponse);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export default useFetchCaseData;