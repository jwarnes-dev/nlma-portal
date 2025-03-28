import React, { useState } from "react";
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

export default function CaseView() {
    const { data, loading, error } = useFetchCaseData(); 
    const { caseId } = useParams() as { caseId: string }
    const matter = data?.filter(d => d.case.toLowerCase() == caseId.toLowerCase())[0];

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
                <Paper sx={{padding: '16px', width: '100%'}} elevation={3}>
                    <Typography variant="h6">Parties</Typography>
                    <Typography variant="caption">Shows the first few parties on the case.</Typography>
                    <Box sx={{width: '80%', margin: '0 auto', display: 'none'}}>
                        <Box sx={{display: 'flex', marginTop: '12px', justifyContent: 'space-around'}}>
                            <Box sx={{display: 'flex', flexDirection: 'column', textAlign: 'right'}}>
                                <Typography sx={{fontWeight: '600'}}>{matter?.parties.appellant}</Typography>
                                <Typography sx={{lineHeight: 'normal'}} variant="overline">Respondent</Typography>
                            </Box>
                            <Box sx={{padding: '5px 16px 0 16px', flex: '1'}}>
                                <hr aria-orientation="horizontal" />
                            </Box>
                            <Box sx={{disdplay: 'flex', flexDirection: 'column', textAlign: 'left'}}>
                                <Typography sx={{lineHeight: 'normal', fontWeight: '600'}}>Josh Sanchez</Typography>
                                <Typography sx={{lineHeight: 'normal', position: 'relative', top: '-3px'}} variant="overline">Representation</Typography>
                            </Box>
                        </Box>
                        <Box sx={{display: 'flex', marginTop: '12px', justifyContent: 'space-around'}}>
                            <Box sx={{display: 'flex', flexDirection: 'column', textAlign: 'right'}}>
                                <Typography sx={{fontWeight: '600'}}>DEEP</Typography>
                                <Typography sx={{lineHeight: 'normal'}} variant="overline"></Typography>
                            </Box>
                            <Box sx={{padding: '5px 16px 0 16px', flex: '1'}}>
                                <hr aria-orientation="horizontal" />
                            </Box>
                            <Box sx={{disdplay: 'flex', flexDirection: 'column', textAlign: 'left'}}>
                                <Typography sx={{lineHeight: 'normal', fontWeight: '600'}}>Benjamin Gutman</Typography>
                                <Typography sx={{lineHeight: 'normal', position: 'relative', top: '-3px'}} variant="overline">Representation</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
            <Grid size={6}>
                 <EventsList events={[]} />
                 {/* <UpcomingEvents /> */}
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
                            <TabPanel value="2">Detailed parties information tab</TabPanel>
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