"use client"
import * as React from 'react';
import { PageContainer } from '@toolpad/core';
import EventList from '../case-search/components/events/EventList';
import useFetchCaseData from '../case-search/hooks/useFetchCases';
import axios from "axios";
import { useEffect, useState } from 'react';
import { APIResponse } from '@/app/common/types';

export default function TestPage() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState<boolean>(true);
  const casesEndpoint = 'http://localhost:3030/cases'

  useEffect(() => {
    const fetchData =  async () => {
      try {
        setLoading(true);
        const response = await axios.get(casesEndpoint);
        console.log("recv")

        const allTasks = response.data.flatMap(item =>
          item.tasks.map(task => ({
            ...task,
            caseNumber: item.caseNumber // Add the parent caseNumber to each task
          }))
        ).sort((a, b) => a.dueDate - b.dueDate);

        // make list of all distinct event dates
        // map structure like {date: '2022-01-01', events: [event1, event2]}
        // show only EventDays within month window in component

        
        setData(allTasks);
        console.log(allTasks)

      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  return (
    
    <PageContainer className='page-container-max'>
      Loading: {loading}
      <EventList master events={[]} />
    </PageContainer>
  );
}
