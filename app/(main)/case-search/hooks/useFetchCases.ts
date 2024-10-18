import { useEffect, useState } from "react";
import axios from "axios";
// import mockCases from "../mock/mock.cases.json"
import mockCases from "../mock/mock.cases-Dep.json"
import { CaseRow, APIResponse } from "@common/types"

interface UseFetchCaseDataReturn {
  data: CaseRow[] | null;
  loading: boolean;
  error: string | null;
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
        const response = await axios.get<APIResponse[]>(casesEndpoint);
        console.log(response.data)

        const mappedData:CaseRow[] = response.data.map(c => {
          return ({
            title: c.subjectMatter,
            case: c.caseNumber,
            status: c.workflowStatus,
            parties: {
              appellant: "",
              respondant: ""
            },
            statusDate: c.updatedDate,
            subType: "",
            type: "",
            dateFiled: c.createdDate
          })
        })
        const fresponse: CaseRow[] = mockCases

        setData(mappedData);
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