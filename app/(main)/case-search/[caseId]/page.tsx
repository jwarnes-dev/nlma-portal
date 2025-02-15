"use client";

import * as React from 'react'
import Typography from '@mui/material/Typography'
import CaseView from '../components/CaseView'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { PageContainer, PageContainerToolbar, useActivePage  } from '@toolpad/core'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import PrintIcon from '@mui/icons-material/Print';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ToggleButton from '@mui/material/ToggleButton';
import Checkbox from '@mui/material/Checkbox';

import Tooltip from '@mui/material/Tooltip';

import Grid from '@mui/material/Grid2'
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TableSortLabel, TablePagination, Paper, TextField,
    InputAdornment, Box, Container, TableFooter, MenuItem,
    Link,
    Button
  } from "@mui/material";
  import { useParams  } from 'next/navigation'
import useFetchCaseData from '../hooks/useFetchCases';
import { Suspense } from 'react'

import FormControlLabel from '@mui/material/FormControlLabel';
import { useAuth } from '@auth/FirebaseContext';




export default function CaseViewPage() {
    const { caseId } = useParams() as { caseId: string }

    const { data, loading, error } = useFetchCaseData(); 
    const [watch, setWatch] = React.useState(false);
    const { isAuthed } = useAuth();

    const matter = data?.filter(d => d.case.toLowerCase() == caseId.toLowerCase())[0];

    const title = `Case View: ${matter?.title}`;

    const  breadCrumbs = [
        {title: "Search Cases", path: "../case-search"},
        {title: caseId, path: ""},
    ]

    const handleWatchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setWatch(event.target.checked);
    };

    function PageToolbar() {
      return (
        <PageContainerToolbar>
          <Tooltip title={isAuthed ? "Subscribe to be notified of updates on this case." : "You must be logged in to use this feature!"}>
            <FormControlLabel control={<Checkbox icon={<VisibilityIcon />} checkedIcon={<VisibilityOffIcon />} disabled={!isAuthed} checked={watch} onChange={handleWatchChange}  />} 
            label={watch ? "Unsubscribe" : "Subscribe"} />
          </Tooltip>
          {/* <Button startIcon={<PrintIcon />} color="inherit">
            Print View
          </Button> */}
        </PageContainerToolbar>
      );
    }
  
  

    return (
        <PageContainer className='page-container-max' sx={{maxWidth: '200px'}} title={title} breadCrumbs={breadCrumbs} slots={{ toolbar: PageToolbar }}>
            <CaseView></CaseView>
        </PageContainer>
    )
}