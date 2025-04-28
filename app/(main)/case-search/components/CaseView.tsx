import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, TablePagination, Paper, TextField,
  InputAdornment, Box, Container, TableFooter, MenuItem,
  Link,
  Skeleton, Tabs, Tab,
  Typography,
  Divider
} from "@mui/material";
import Grid from '@mui/material/Grid2'
import CaseStatusStepper from "./CaseStatusStepper"
import CaseViewDocumentsTable from "./CaseViewDocumentsTable"
import UpcomingEvents from "./UpcomingEvents"
import EventsList from "./events/EventList"
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import useFetchCaseData from "../hooks/useFetchCases";
import { useParams  } from 'next/navigation'
import { Label } from "@mui/icons-material";
import Comments from "./comments/Comments";
import mockCases from "../mock/mock-cases-docs.json"
import dayjs from "dayjs";
import { Event } from "@common/types";

export default function CaseView() {
    const { data, loading, error } = useFetchCaseData(); 
    const { caseId } = useParams() as { caseId: string }
    const matter = data?.filter(d => d.case.toLowerCase() == caseId.toLowerCase())[0];
    const [eventDays, setEventDays] = useState<{ date: string; dayName: string; dateNumber: string; month: string; events: Event[]; active?: boolean }[]>([]);

    const statusTypes = [
        "Pre-Hearing",
        "Hearing",
        "Proposed Decision",
        "Final Decision",
        "Archive"
    ]

    const statusTypesMap2 = [
        {label: "Pre-hearing"}
    ]

    const getStatusStep = () => {
        if(matter)
            return matter.status
        else
            return "Hearing"
    }

    // Process tasks into event days
    useEffect(() => {
        if (matter) {
            // Get raw case data from mock data
            const rawCase = mockCases.find(c => c.caseNumber?.toLowerCase() === caseId.toLowerCase());
            
            if (rawCase?.tasks) {
                // Map tasks to events
                const mappedEvents = rawCase.tasks.sort((a, b) => {
                    if (!a.beginTime || !b.beginTime) return 0;
                    return a.beginTime.localeCompare(b.beginTime);
                }).map((task) => {
                    const event: Event = {
                        id: task.taskNumber || `task-${Math.random().toString(36).substr(2, 9)}`,
                        title: task.taskType,
                        info: task.instructions || '',
                        date: task.dueDate,
                        location: 'Court', // Default location since it's not in the task data
                        time: task.beginTime || 'All Day',
                        endtime: task.endTime,
                        caseNumber: caseId,
                        matter: task.instructions || matter.title
                    };
                    return event;
                });
                
                // Get unique dates
                const days = new Set<string>(mappedEvents.map(e => e.date));
                const processedDays: { date: string; dayName: string; dateNumber: string; month: string; events: Event[]; active?: boolean }[] = [];
                
                // Process each day
                days.forEach((day) => {
                    const dayEvents = mappedEvents.filter(e => e.date === day);
                    const dayName = dayjs(day, 'MM-DD-YYYY').format('ddd');
                    const dateNumber = dayjs(day, 'MM-DD-YYYY').format('DD');
                    const month = dayjs(day, 'MM-DD-YYYY').format('MMMM YYYY');
                    
                    processedDays.push({
                        date: day,
                        dayName,
                        dateNumber,
                        month,
                        events: dayEvents,
                        active: false
                    });
                });
                
                // Handle current day logic
                const today = dayjs().format('MM-DD-YYYY');
                let currentDayExists = false;
                
                // Check if current day exists and mark it active
                processedDays.forEach(day => {
                    if (day.date === today) {
                        day.active = true;
                        currentDayExists = true;
                    } else {
                        day.active = false;
                    }
                });
                
                // Add current day if it doesn't exist in the list
                if (!currentDayExists) {
                    const dayName = dayjs(today).format('ddd');
                    const dateNumber = dayjs(today).format('DD');
                    const month = dayjs(today).format('MMMM YYYY');
                    processedDays.push({ 
                        date: today, 
                        dayName, 
                        dateNumber, 
                        month, 
                        events: [],
                        active: true 
                    });
                }
                
                // Sort days by date
                const sortedDays = processedDays.sort((a, b) => {
                    return dayjs(a.date, 'MM-DD-YYYY').isAfter(dayjs(b.date, 'MM-DD-YYYY')) ? 1 : -1;
                });
                
                setEventDays(sortedDays);
            }
        }
    }, [matter, caseId]);

    const [tab, setTab] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setTab(newValue);
    };

    return (
        <Grid container spacing={2}>
            <Grid container size={6}>
                <Paper sx={{padding: '16px', width: '100%'}} elevation={3} >
                <Typography variant="h5" gutterBottom>Status</Typography>
                {getStatusStep()}
                    <CaseStatusStepper initialStep={statusTypes.indexOf(getStatusStep())}></CaseStatusStepper>
                    <Divider sx={{marginTop: '20px'}} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '16px' }}>
                        <Box>
                            <Box sx={{display: 'flex'}}>
                                <Box sx={{marginRight: '6px'}} color={"GrayText"}>Case Number: </Box>
                                <Box>{matter?.case}</Box>
                            </Box>
                            <Box sx={{display: 'flex', marginTop: '6px'}}>
                                <Box sx={{marginRight: '6px'}} color={"GrayText"}>Filed Date: </Box>
                                <Box>{matter?.dateFiled}</Box>
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{display: 'flex'}}>
                                <Box sx={{marginRight: '6px'}} color={"GrayText"}>Status: </Box>
                                <Box>{matter?.status}</Box>
                            </Box>
                            <Box sx={{display: 'flex', marginTop: '6px'}}>
                                <Box sx={{marginRight: '6px'}} color={"GrayText"}>Case Type: </Box>
                                <Box>{matter?.type}</Box>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
            <Grid size={6}>
                 <EventsList events={[]} eventDays={eventDays} />
            </Grid>
            <Grid size={12}>
                <Paper sx={{padding: '16px', width: '100%'}} elevation={3} >
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={tab}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Documents" value="1" />
                                <Tab label="Parties" value="2" />
                                <Tab label="Comments" value="3" />
                            </TabList>
                            </Box>
                            <TabPanel value="1">
                                <CaseViewDocumentsTable documents={matter?.documents || []} />
                            </TabPanel>
                            <TabPanel value="2">
                                <Box sx={{ width: '100%' }}>
                                    <Typography variant="subtitle1" gutterBottom>Case Parties</Typography>
                                    {matter && matter.contacts && matter.contacts.length > 0 ? (
                                        <Paper elevation={1} sx={{ p: 2 }}>
                                            {matter.contacts!.map((contact, index) => (
                                                <Box key={index} sx={{ mb: 1, pb: 1, borderBottom: index < matter.contacts!.length - 1 ? '1px solid #eee' : 'none' }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography variant="body1">
                                                            {contact.firstName} {contact.lastName}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            {contact.contactType}
                                                        </Typography>
                                                    </Box>
                                                    {(contact.city || contact.state || contact.usPhone) && (
                                                        <Typography variant="body2" color="textSecondary">
                                                            {contact.city}{contact.city && contact.state ? ', ' : ''}
                                                            {contact.state}
                                                            {contact.usPhone && (contact.city || contact.state) ? ' • ' : ''}
                                                            {contact.usPhone && `Phone: ${contact.usPhone}`}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            ))}
                                        </Paper>
                                    ) : (
                                        <Typography variant="body1" color="textSecondary">No parties information available.</Typography>
                                    )}
                                </Box>
                            </TabPanel>
                            <TabPanel value="3">
                                <Comments />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}