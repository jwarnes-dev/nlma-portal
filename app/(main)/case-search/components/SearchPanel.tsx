// SearchPanel.tsx
import React from 'react';
import { TextField, InputAdornment, MenuItem, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid2';
import Calendar from '@mui/icons-material/Event';
import { DatePicker, DateRangePicker, SingleInputDateRangeField } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';

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


const SearchPanel = ({ searchText, handleSearchChange, searchForm, handleSearchFormChange, handleDateChange, loading }) => {
  return (
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
              {/* <DatePicker value={searchForm.dateFiled} label="Filed Date" sx={{marginTop: '14px'}}
                name="dateFiled" onChange={(newDate) => handleDateChange("dateFiled", newDate)}
                slotProps={{
                  actionBar: {
                    actions: ['clear'],
                  }
                }}
              />
               */}
              <DateRangePicker
                sx={{marginTop: '14px'}}
                slots={{ field: SingleInputDateRangeField }}
                slotProps={{ 
                  textField: { InputProps: { endAdornment: <Calendar /> },
                } }}
                label="Filed Date"
                calendars={1}
              /> 
               <DateRangePicker
                sx={{marginTop: '14px'}}
                slots={{ field: SingleInputDateRangeField }}
                slotProps={{ textField: { InputProps: { endAdornment: <Calendar /> } } }}
                label="Last Updated"
                calendars={1}
              /> 
              <TextField sx={{marginBottom: '8px'}}
                label="Case Party"
                variant="outlined"
                margin="dense"
                name="caseParty" onChange={handleSearchFormChange} value={searchForm.caseParty}
                size="small"
              /> 
        </Paper>
  );
};

export default SearchPanel;
