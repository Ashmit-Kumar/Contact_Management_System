// src/components/ContactTable.js
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { deleteContact } from '../api/contactAPI';
import TablePaginationComponent from './TablePagination'; // Import the pagination component

const ContactTable = ({ contacts, onContactDeleted }) => {
  const [page, setPage] = useState(0);  // Track current page
  const [rowsPerPage, setRowsPerPage] = useState(5);  // Track number of rows per page

  // Handle page change event
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change event
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);  // Reset page to 0 when rows per page changes
  };

  // Handle delete contact
  const handleDelete = async (id) => {
    try {
      await deleteContact(id);  // Call the backend to delete the contact
      onContactDeleted(id);  // Remove the contact from the list
    } catch (error) {
      alert('Error deleting contact!');
    }
  };

  // Get the contacts for the current page
  const paginatedContacts = contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.jobTitle}</TableCell>
                <TableCell>
                  <Button color="secondary" onClick={() => handleDelete(contact.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <TablePaginationComponent
        count={contacts.length}  // Total number of contacts
        rowsPerPage={rowsPerPage}  // Rows per page (pagination)
        page={page}  // Current page
        onPageChange={handleChangePage}  // Page change handler
        onRowsPerPageChange={handleChangeRowsPerPage}  // Rows per page change handler
      />
    </>
  );
};

export default ContactTable;
