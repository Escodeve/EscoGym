'use client';

import { useState, useEffect } from 'react';
import { TextField, Button, Stack, TablePagination } from '@mui/material';
import axios from 'axios';
import AccessLogsTable, { AccessLog } from './AccessLogsTable';
import AccessFilters from './AccessFilters';

export default function RegistrePage() {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchName, setSearchName] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token manquant');
  
      const response = await axios.get(
        'https://gym-access-worker.gym-access.workers.dev/api/v1/accessLogs',
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            page: page + 1,
            pageSize,
            searchName: searchName || undefined,
            checkInDate: filterDate || undefined,
          },
        }
      );
  

      const logsWithName: AccessLog[] = response.data.logs.map((log) => ({
        ...log,
        userName: log.user?.name,
      }));
  
      setLogs(logsWithName);
      setTotal(response.data.total);
    } catch (error: any) {
      console.error('Erreur lors du fetch des logs :', error.message);
    }
  };
  

  useEffect(() => {
    fetchLogs();
  }, [page, pageSize]);

  const handleSearch = () => {
    setPage(0);
    fetchLogs();
  };

  return (
    <div className="p-6 min-h-screen">
      <Stack
        direction={{ xs: 'column', sm: 'row', md: 'row' }}
        spacing={{ xs: 2, sm: 3, md: 4 }}
        mb={6}
        alignItems="flex-start"
      >
        <AccessFilters
          searchName={searchName}
          setSearchName={setSearchName}
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          onSearch={handleSearch}
        />
      </Stack>

      <AccessLogsTable logs={logs} />

      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e) => {
          setPageSize(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 20, 50]}
        className="mt-4"
      />
    </div>
  );
}
