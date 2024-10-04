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

export default function UpcomingEvents() {
    return (
        <Paper sx={{padding: '16px', width: '100%'}} elevation={3} >
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <Typography variant="h5">Case Calendar</Typography>
                <Divider sx={{marginBottom: '12px'}} />
                <Box sx={{paddingLeft: '6px'}}>
                    <Typography variant="h6" sx={{marginLeft: '-3px'}}>Upcoming Events</Typography>
                    <Typography color="primary" sx={{cursor: 'pointer'}}>January 6th 2025 &nbsp;&nbsp;&nbsp; Hearing &nbsp;&nbsp;&nbsp; 12:00PM - 2:30PM</Typography>
                    <Typography color="primary" sx={{cursor: 'pointer'}}>Febuary 3rd 2025 &nbsp;&nbsp;&nbsp; Site Visit &nbsp;&nbsp;&nbsp;&nbsp; 3:00PM - 4:00PM</Typography>
                    <Typography color="primary" sx={{cursor: 'pointer'}}>January 6th 2025 &nbsp;&nbsp;&nbsp; Trial &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 10:00AM - 1:00PM</Typography>
                </Box>
                <Box sx={{paddingLeft: '6px', marginTop: '8px'}}>
                    <Typography variant="h6" sx={{marginLeft: '-3px'}}>Past Events</Typography>
                    <Typography>January 6th 2024 &nbsp;&nbsp;&nbsp; Civil Hearing </Typography>
                    <Typography>Febuary 3rd 2023 &nbsp;&nbsp;&nbsp; Site Visit</Typography>
                    <Typography>January 6th 2023 &nbsp;&nbsp;&nbsp; Public Hearing</Typography>
                    <Typography>October 1st 2023 &nbsp;&nbsp;&nbsp; Trial</Typography>
                </Box>
            </Box>
            
        </Paper>
    )
}