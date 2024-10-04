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


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'dateAdded', headerName: 'Date Added', width: 130 },
  { field: 'category', headerName: 'Category', width: 200 },
  { field: 'name', headerName: 'Document Name', width: 300,  },
  { field: 'view', sortable: false, disableColumnMenu: true, headerName: 'View',
    renderCell: (p) => {
      return <IconButton color="primary"><DescriptionIcon /> </IconButton>;
    }
   },
];
const paginationModel = { page: 0, pageSize: 3 };

const ViewButton = <IconButton color="primary"><DescriptionIcon /> </IconButton>

const rows = [
  {id: 2421, dateAdded: '2024-06-22', category: 'Supporting Documents', name: 'DEEP Exhibit #1 ', view: ''},
  {id: 211, dateAdded: '2024-03-05', category: 'Supporting Documents', name: 'Land Use Permit', view: ''},
  {id: 3214, dateAdded: '2024-09-14', category: 'Supporting Documents', name: 'Final Decision Notice', view: 'abc'},
]



export default function CaseViewDocumentsTable() {
    return (
      <DataGrid
        rows={rows}
        columns={columns}
        rowSelection={false}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[3, 10, 20]}
        sx={{ border: 0 }}
      />
    )
}