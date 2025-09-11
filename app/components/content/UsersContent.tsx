"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Avatar,
  TextField,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface User {
  name: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
  accountStatus: "ACTIVE" | "INACTIVE";
  accessStatus: "IN" | "OUT";
}

const UsersContent: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fakeUsers: User[] = [
    { name: "John Doe", email: "john@example.com", phone: "123-456-7890", gender: "Male", role: "Admin", accountStatus: "ACTIVE", accessStatus: "IN" },
    { name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", gender: "Female", role: "User", accountStatus: "INACTIVE", accessStatus: "OUT" },
    { name: "Mike Johnson", email: "mike@example.com", phone: "555-222-1111", gender: "Male", role: "Moderator", accountStatus: "ACTIVE", accessStatus: "IN" },
    { name: "Alice Brown", email: "alice@example.com", phone: "444-555-6666", gender: "Female", role: "User", accountStatus: "ACTIVE", accessStatus: "IN" },
    { name: "Bob Green", email: "bob@example.com", phone: "777-888-9999", gender: "Male", role: "User", accountStatus: "INACTIVE", accessStatus: "OUT" },
  ];

  const filteredUsers = fakeUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box className="flex flex-col w-full p-6 space-y-6 items-start">
      {/* Title */}
      <Typography variant="h3" className="font-bold">
        Listes des utilisateurs
      </Typography>

      {/* Search bar */}
      <TextField
        placeholder="Rechercher un utilisateur..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        variant="outlined"
        size="small"
        className="w-full max-w-md rounded-lg"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            </InputAdornment>
          ),
          sx: { borderRadius: "12px" },
        }}
      />

      {/* Table container */}
      <Paper className="shadow-md rounded-lg w-full overflow-x-auto">
        <TableContainer sx={{ minWidth: 700 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Account Status</TableCell>
                <TableCell>Access Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedUsers.length > 0 ? (
                displayedUsers.map((user, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar sx={{ width: 28, height: 28 }}>{user.name.charAt(0)}</Avatar>
                        {user.name}
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.accountStatus}</TableCell>
                    <TableCell>{user.accessStatus}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Aucun utilisateur trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
    </Box>
  );
};

export default UsersContent;
