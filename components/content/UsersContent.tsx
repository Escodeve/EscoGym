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
  Box,
  Typography,
  Button,
  Drawer,
  TextField,
  Stack,
} from "@mui/material";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";

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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fakeUsers: User[] = [];

  const filteredUsers = fakeUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangePage = (event: unknown, newPage: number) =>
    setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box className="flex flex-col w-full p-6 space-y-6 items-start rounded-5xl">
      {/* Title */}
      <Typography variant="h3" className="font-bold pb-10 ">
        Listes des utilisateurs
      </Typography>

      {/* Table container */}
      <Box className="flex justify-center w-full">
        <Paper
          className="shadow-md rounded-lg overflow-x-auto"
          sx={{
            width: "95%", maxWidth: 1700, borderRadius: "16px", // 👈 rounded corners
            overflow: "hidden",
          }}
        >
          {/* Search & Button Row inside Paper */}
          <Box className="flex w-full justify-between items-center p-5">
            <div className="relative w-1/2">
              <MagnifyingGlassIcon className="w-6 h-6 text-black/70 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 p-3 rounded-full border border-black/60 focus:outline-none focus:ring-2 focus:ring-[#94e03e] w-full text-lg"
              />
            </div>
            <Button
              variant="contained"
              startIcon={<PlusIcon className="w-5 h-5" />}
              onClick={() => setDrawerOpen(true)}
              sx={{
                bgcolor: "#94e03e",
                color: "black",
                borderRadius: "50px",
                px: 3,
                py: 1.5,
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#7bc32d" },
              }}
            >
              Ajouter Utilisateur
            </Button>
          </Box>

          {/* Table */}
          <TableContainer
            sx={{
              minWidth: 700,
              "& .MuiTableRow-root": {
                "&:not(:last-child)": {
                  marginBottom: 8, // spacing between rows
                },
              },
            }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {[
                    "Name",
                    "Email",
                    "Phone",
                    "Gender",
                    "Role",
                    "Account Status",
                    "Access Status",
                  ].map((head) => (
                    <TableCell
                      key={head}
                      sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.8) !important",
                        color: "white",
                        fontWeight: "bold",
                        // fontSize: "0.75rem",
                        py: 2.5,
                      }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedUsers.length > 0 ? (
                  displayedUsers.map((user, index) => (
                    <TableRow
                      key={index}
                      hover
                      sx={{ "& > *": { py: 2.5 } }}
                    >
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar sx={{ width: 28, height: 28 }}>
                            {user.name.charAt(0)}
                          </Avatar>
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
                    <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <img
                          src="/assets/illustrations/no_data.svg"
                          alt="No users found"
                          style={{ width: 350, marginBottom: 16 }}
                        />
                      </Box>
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

      {/* Drawer for adding user */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 600, p: 4 }}>
          {" "}
          {/* increased width */}
          <Typography variant="h5" className="mb-4 font-bold pb-4">
            Ajouter un utilisateur
          </Typography>
          <Stack spacing={2}>
            <TextField label="Nom" fullWidth />
            <TextField label="Email" type="email" fullWidth />
            <TextField label="Téléphone" fullWidth />
            <TextField label="Genre" fullWidth />
            <TextField label="Rôle" fullWidth />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#94e03e",
                color: "black",
                fontWeight: "bold",
                "&:hover": { bgcolor: "black", color: "white" },
              }}
              fullWidth
            >
              Sauvegarder
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
};

export default UsersContent;
