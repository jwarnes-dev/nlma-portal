"use client"
import * as React from 'react';
import { PageContainer } from '@toolpad/core';
import EventList from '../case-search/components/events/EventList';
import useFetchCaseData from '../case-search/hooks/useFetchCases';
import axios from "axios";
import { useEffect, useState } from 'react';
import { APIResponse } from '@/app/common/types';
import dayjs from 'dayjs';
import { Event } from "@common/types";
import mockCases from "../case-search/mock/mock.cases-live.json"

export default function TestPage() {

  const [data, setData] = useState<{ date: string; dayName: string; dateNumber: string; month: string; events: any[] }[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const casesEndpoint = 'http://localhost:3030/cases'

  useEffect(() => {
    const fetchData =  async () => {
      try {
        setLoading(true);
        // const response = await axios.get(casesEndpoint);
        const response = { data: mockCases } 


        console.log("recv")

        const allTasks = response.data.flatMap(item =>
          item.tasks.map(task => ({
            ...task,
            caseNumber: item.caseNumber
          }))
        ).sort((a, b) => a.dueDate - b.dueDate);


        const days = new Set<string>(allTasks.map( t => t.dueDate));
        console.log(days)
        const today = dayjs().format('MM-DD-YYYY');
        if (!days.has(today)) {
          days.add(today);
        }
        const eventDays: { date: string; dayName: string; dateNumber: string; month: string; events: any[] }[] = [];

        // {
        //   "allDay": true,
        //   "instructions": "This is a General Task.\r\n\r\n\r\n",
        //   "taskType": "General Task",
        //   "dueDate": "10-04-2024",
        //   "taskNumber": "T-2024-00029",
        //   "beginTime": "",
        //   "endTime": "",
        //   "status": "Completed"
        // },

        days.forEach((day: string) => {
          const events = allTasks.filter(t => t.dueDate === day);
          const mappedEvents = events.sort((a, b) => a.beginTime - b.beginTime).map((e) => {
            const event: Event = {
              id: e.taskNumber,
              title: e.taskType,
              // description: e.instructions,
              info: e.instructions,
              date: e.dueDate,
              location: 'Zoom',
              time: e.beginTime || 'All Day',
              // date: e.dueDate,
              caseNumber: e.caseNumber,
              // status: e.status,
              // allDay: e.allDay,
              // beginTime: e.beginTime,
              // endTime: e.endTime
            }; 
            return event;
          })
          const dayName = dayjs(day).format('ddd');
          const dateNumber = dayjs(day).format('DD');
          const month = dayjs(day).format('MMMM YYYY');
          eventDays.push({ date: day, dayName, dateNumber, month, events: mappedEvents });
        })

        const sortedDays = eventDays.sort((a, b) => a.date > b.date ? 1 : -1);
        
        setData(sortedDays);

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
      <EventList master events={[]} eventDays={data} />
    </PageContainer>
  );
}
