import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, TablePagination, Paper, TextField,
  InputAdornment, Box, Container, TableFooter, MenuItem,
  Link
} from "@mui/material";
import NextLink from 'next/link'
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Calendar from '@mui/icons-material/Event';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid2';
import { DateRangePicker, SingleInputDateRangeField } from '@mui/x-date-pickers-pro';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import Collapse from '@mui/material/Collapse';



import { CaseRow } from "@common/types";
import useFetchCaseData from "../hooks/useFetchCases";


interface Column {
  id: keyof CaseRow;
  label: string;
}

const columns: Column[] = [
  { id: "title", label: "Title" },
  { id: "case", label: "Case" },
  { id: "type", label: "Type" },
  { id: "subType", label: "Code" },
  { id: "dateFiled", label: "Date Filed" },
  { id: "status", label: "Status" },
  { id: "statusDate", label: "Final Decision" },
  { id: "parties", label: "Parties" }
]

// const caseTypes = [
//   { label: 'Civil Claim Filing', value: 'civil' },
//   { label: 'Hearing', value: 'hearing' },
//   { label: 'Personal Matter', value: 'personal' },
//   { label: 'Prehearing Conference', value: 'prehearing' },
//   { label: 'Settlement Conference', value: 'settlement' },
//   { label: 'Status conference', value: 'status' },
//   { label: 'Trial', value: 'trial' }
// ]
const caseTypes = [
  { label: 'Permits', value: 'permit' },
  { label: 'Orders', value: 'order' },
  { label: 'License', value: 'license' },
]

// const statusTypes = [
//   {label: 'eFile Submission', value: 'efile' },
//   {label: 'Open', value: 'open' },
//   {label: 'Completed', value: 'completed' },
//   {label: 'Cancelled', value: 'cancelled' },
//   {label: 'Hold', value: 'hold' },
//   {label: 'In Progress', value: 'inprogress' },
//   {label: 'Archive', value: 'archive' }
// ]

const statusTypes = [{ label: "Pre-hearing", value: "Pre-hearing" },
  { label: "Hearing", value: "Hearing" },
  { label: "Proposed Decision", value: "Proposed Decision" },
  { label: "Final Decision", value: "Final Decision" },
  { label: "Archive", value: "Archive" },]
  
const caseSubType = [
  {label: "Air", value: "AIR"},
  {label: "Dam Safety", value: "DAM"},
  {label: "Flood Management Exemption", value: "FMGT"},
  {label: "General Permits", value: "GP"},
  {label: "Inland Wetlands & Watercourses", value: "IWW"},
  {label: "Pesticides", value: "PEST"},
  {label: "Remediation", value: "REM"},
  {label: "Structures & Dredging/Tidal Wetlands", value: "S&D"},
  {label: "Solid Waste", value: "SW"},
  {label: "Water Discharge", value: "WDIS"},
  {label: "Water Diversion", value: "WDIV"},
  {label: "Water Quality Certification", value: "WQC"},
  {label: "Water Ski Slalom Course", value: "WSKI"}
]


function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<Key extends keyof any>(
  order: "asc" | "desc",
  orderBy: Key
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function CaseTable() {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof CaseRow>("title");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(50);
  const { data, loading, error } = useFetchCaseData(); 
  const [searchText, setSearchText] = useState<string>("");
  const [searchForm, setSearchForm] = useState<CaseTableSearchForm>(
                                              {
                                                quickSearch: "",
                                                caseNumber: "",
                                                caseType: "",
                                                caseStatus: "",
                                                dateFiled: null,
                                                statusDate: null,
                                                caseParty: "",
                                                caseTitle: ""
                                              });

  interface CaseTableSearchForm {
    quickSearch: string
    caseNumber: string
    caseType: string
    caseStatus: string
    dateFiled: Dayjs | null
    statusDate: Dayjs | null
    caseParty: string
    caseTitle: string
  }

  const temp: string = "";

  const handleRequestSort = (property: keyof CaseRow) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setPage(0);
  }

  const handleSearchFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchForm({...searchForm, [event.target.name]: event.target.value})
  };

  const handleDateChange = (dateKey: string, newDate: dayjs.Dayjs | null) => {
    setSearchForm({...searchForm, [dateKey]: newDate})
  }

  const filteredRows = data?.filter(row => {
    const search = searchText.toLowerCase();
    return (
      (row.title.toLowerCase().includes(search)
      || row.case.toLowerCase().includes(search)
      || row.type.toLowerCase().includes(search) 
      || row.subType?.toLowerCase().includes(search) 
      || row.status.toLowerCase().includes(search)
      || row.parties.appellant.toLowerCase().includes(search)
      || row.parties.respondant.toLowerCase().includes(search))
      && (row.title.toLowerCase().includes(searchForm.caseTitle.toLowerCase()))
      && (row.case.toLowerCase().includes(searchForm.caseNumber.toLowerCase()))
      && (searchForm.caseStatus === "" || row.status.toLowerCase() === searchForm.caseStatus.toLowerCase())
      && (row.type.toLowerCase().includes(searchForm.caseType.toLowerCase()))
      && (row.parties.appellant.toLowerCase().includes(searchForm.caseParty.toLowerCase()) || row.parties.respondant.toLowerCase().includes(searchForm.caseParty.toLowerCase()))
      && (row.dateFiled.includes(searchForm.dateFiled?.format('YYYY-MM-DD') || ''))
      && (row.statusDate.includes(searchForm.statusDate?.format('YYYY-MM-DD') || ''))
    )
  }) || [];


  const sortedRows = filteredRows.sort(getComparator(order, orderBy));

  return (
    <Grid container spacing={1}>
      <Grid size={2}>
        <Paper square sx={
          {
            padding: '0 12px', 
            display: 'flex',
            flexDirection: 'column',


          }}>
            <TextField
                label="Quick Search"
                variant="outlined"
                margin="dense"
                value={searchText}
                onChange={handleSearchChange}
                helperText="Search by title, status, type, etc"
                size="small"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                label="Case Title"
                margin="dense"
                name="caseTitle" onChange={handleSearchFormChange} value={searchForm.caseTitle}
                size="small"
              />
              <TextField
                label="Case Number"
                variant="outlined"
                margin="dense"
                name="caseNumber" onChange={handleSearchFormChange} value={searchForm.caseNumber}
                size="small"
              /> 
              <TextField select label="Case Type" size="small" margin="dense" name="caseType" onChange={handleSearchFormChange} value={searchForm.caseType}>
                {caseTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
                <MenuItem key="none" value="">
                    <em>Clear</em>
                </MenuItem>
              </TextField>
              <TextField select label="Case Status" size="small" margin="dense" name="caseStatus" onChange={handleSearchFormChange} value={searchForm.caseStatus}>
                {statusTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
                  <MenuItem key="none" value="">
                    <em>Clear</em>
                  </MenuItem>
              </TextField>
              <DatePicker value={searchForm.dateFiled} label="Filed Date" sx={{marginTop: '14px'}}
                name="dateFiled" onChange={(newDate) => handleDateChange("dateFiled", newDate)}
                slotProps={{
                  actionBar: {
                    actions: ['clear'],
                  }
                }}
              />
              <DatePicker value={searchForm.statusDate} label="Final Decision" sx={{marginTop: '14px'}}
                name="statusDate" onChange={(newDate) => handleDateChange("statusDate", newDate)}
                slotProps={{
                  actionBar: {
                    actions: ['clear'],
                  }
                }}
              />
              {/* <DateRangePicker
                sx={{marginTop: '14px'}}
                slots={{ field: SingleInputDateRangeField }}
                slotProps={{ textField: { InputProps: { endAdornment: <Calendar /> } } }}
                label="Status Date"
                calendars={1}
              /> */}
              <TextField sx={{marginBottom: '8px'}}
                label="Case Party"
                variant="outlined"
                margin="dense"
                name="caseParty" onChange={handleSearchFormChange} value={searchForm.caseParty}
                size="small"
              /> 
        </Paper>
      </Grid>
      <Grid size={10}>
        <Paper square style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <TableContainer style={{ flexGrow: 1 }} sx={{ maxHeight: '80vh' }}>
            <Table stickyHeader style={{ minWidth: '100%' }}>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      <TableSortLabel disabled={column.id == 'parties' } 
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={() => handleRequestSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell> 
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.title}</TableCell>
                      <TableCell><Link component={NextLink} href={`/case-search/${row.case}`}>{row.case}</Link></TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.subType}</TableCell>
                      <TableCell>{row.dateFiled}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.statusDate}</TableCell>
                      <TableCell>{`${row.parties.appellant}`}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
          </TableContainer>
          <TablePagination
              rowsPerPageOptions={[10, 50, 100]}
              component="div"
              count={sortedRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CaseTable;