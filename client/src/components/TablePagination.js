// src/components/TablePagination.js
import React from 'react';
import { TablePagination } from '@mui/material';

// This component is for controlling pagination in the table
const TablePaginationComponent = ({ count, rowsPerPage, page, onPageChange, onRowsPerPageChange }) => {

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}  // Options for number of rows per page
      component="div"
      count={count}  // Total number of contacts
      rowsPerPage={rowsPerPage}  // Current number of rows per page
      page={page}  // Current page number
      onPageChange={onPageChange}  // Handler for page change
      onRowsPerPageChange={onRowsPerPageChange}  // Handler for rows per page change
    />
  );
};

export default TablePaginationComponent;
