import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, TablePagination, Paper, Link
} from "@mui/material";
import NextLink from 'next/link';
import dayjs, { Dayjs } from 'dayjs';

const dateFormatString = 'MMM DD YYYY';

const CaseTableView = ({ columns, sortedRows, orderBy, order, handleRequestSort, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                <TableSortLabel
                  disabled={column.id === 'parties'}
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
                <TableCell>{ dayjs(row.dateFiled).format(dateFormatString) }</TableCell>
                <TableCell>{row.status}</TableCell>
                {/* <TableCell>{ dayjs(row.statusDate).format(dateFormatString) }</TableCell> */}
                {/* <TableCell>{`${row.parties.appellant}`}</TableCell> */}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 50, 100]}
        component="div"
        count={sortedRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default CaseTableView;
