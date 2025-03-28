import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, TablePagination, Paper, TextField,
  InputAdornment, Box, Container, TableFooter, MenuItem,
  Link,
  Skeleton, Tabs, Tab,
  Typography,
  Divider, Button
} from "@mui/material"
import Grid from '@mui/material/Grid2'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DescriptionIcon from '@mui/icons-material/Description';
import { RawDocument } from "@/app/common/types";
import FileDownloadButton from "./FileDownloadButton";


// Todo: /case/getFileById


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', hideable: true, width: 15 },
  { field: 'docketedFileNumber', headerName: 'Docket Number' },
  { field: 'fileId', headerName: 'File Number' },
  { field: 'receivedDate', headerName: 'Date Added', width: 100 },
  { field: 'filedBy', headerName: 'Filed By', width: 200 },
  { field: 'onBehalfOf', headerName: 'Filed on Behalf of', width: 100 },
  { field: 'documentCategory', headerName: 'Category', width: 200 },
  { field: 'documentType', headerName: 'Document Type', width: 50 },
  { field: 'documentName', headerName: 'Document Name', width: 250,  },
  { field: 'isConfidential', headerName: 'Confidential', width: 15 },
  { field: 'view', sortable: false, disableColumnMenu: true, headerName: 'View',
    renderCell: (p) => {
      return <FileDownloadButton fileId={p.row.fileId} />
    }
   },
];
const paginationModel = { page: 0, pageSize: 5 };

const ViewButton = <IconButton color="primary"><DescriptionIcon /> </IconButton>

interface CaseViewDocumentsTableProps {
    documents: RawDocument[];

}

export default function CaseViewDocumentsTable({documents} : CaseViewDocumentsTableProps) {

  const mappedDocuments = documents?.map((doc, index) => {
    return {...doc, id: index}
  })
  
    return (
      <DataGrid
        rows={mappedDocuments}
        columns={columns}
        rowSelection={false}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 20]}
        sx={{ border: 0 }}
      />
    )
}