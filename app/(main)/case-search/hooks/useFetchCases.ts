import { useEffect, useState } from "react";
// import axios from "axios";
// import mockCases from "../mock/mock.cases.json"
import mockCases from "../mock/mock.cases-Dep.json"
import { CaseRow } from "@common/types"

interface UseFetchCaseDataReturn {
  data: CaseRow[] | null;
  loading: boolean;
  error: string | null;
}

function useFetchCaseData(): UseFetchCaseDataReturn {
  const [data, setData] = useState<CaseRow[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData =  () => {
      try {
        setLoading(true);
        // const response = await axios.get<CaseRow[]>("/api/cases");
        const response: CaseRow[] = mockCases
        setData(response);
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