"use client";

import * as React from 'react'
import Typography from '@mui/material/Typography'
import CaseView from '../components/CaseView'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { PageContainer, PageContainerToolbar, useActivePage  } from '@toolpad/core'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import PrintIcon from '@mui/icons-material/Print';
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

  function PageToolbar() {
    return (
      <PageContainerToolbar>
        <Button startIcon={<PrintIcon />} color="inherit">
          Print View
        </Button>
      </PageContainerToolbar>
    );
  }


export default function CaseViewPage() {
    const { caseId } = useParams() as { caseId: string }

    const { data, loading, error } = useFetchCaseData(); 
    const matter = data?.filter(d => d.case.toLowerCase() == caseId.toLowerCase())[0];

    const title = `Case View: ${matter?.title}`;

    const  breadCrumbs = [
        {title: "Search Cases", path: "../case-search"},
        {title: caseId, path: ""},
    ]

    return (
        <PageContainer className='page-container-max' sx={{maxWidth: '200px'}} title={title} breadCrumbs={breadCrumbs} slots={{ toolbar: PageToolbar }}>
            <CaseView></CaseView>
        </PageContainer>
    )
}