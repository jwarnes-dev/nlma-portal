import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, TablePagination, Paper, TextField,
  InputAdornment, Box, Container, TableFooter, MenuItem,
  Link
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import dayjs, { Dayjs } from 'dayjs';

import SearchPanel from "./SearchPanel";
import CaseTableView from "./CaseTableView";



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

const caseTypes = [
  { label: 'Permits', value: 'permit' },
  { label: 'Orders', value: 'order' },
  { label: 'License', value: 'license' },
]


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

    <Grid container spacing={2}>
      <Grid size={2}> 
        <SearchPanel
          searchText={searchText}
          searchForm={searchForm}
          handleSearchChange={handleSearchChange}
          handleSearchFormChange={handleSearchFormChange}
          handleDateChange={handleDateChange}
        />
      </Grid>
      <Grid size={10}>
        <CaseTableView
          columns={columns}
          sortedRows={sortedRows}
          orderBy={orderBy}
          order={order}
          handleRequestSort={handleRequestSort}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>

);
}

export default CaseTable;