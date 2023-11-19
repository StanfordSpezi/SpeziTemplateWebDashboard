/*

This source file is part of the Stanford Spezi Template Web Dashboard open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/

import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Button, Stack } from '@mui/material';
import Link from 'next/link';

type Patient = {
  firstName: string;
  lastName: string;
  id: string;
}

type PatientList = {
  rows: Patient[];
};

export default function PatientList({ rows }: PatientList) {
  const getRowId = (row: Patient) => row.id;
  // auto detect columns from rows
  const columns: { field: string; headerName: string; type?: string; flex?: number; renderCell?: (params: { row: Patient }) => JSX.Element; }[] = [];

  Object.keys(rows[0]).forEach((key) => {
      console.log(key);
      columns.push({ field: key, headerName: key, type: "string" });
  });

  // add button to link to patient's data dashboard 
  columns.push({
      field: 'records',
      headerName: '',
      flex: 1,
      renderCell: (params: { row: Patient }) => {
          console.log("patient row params", params.row); 
          return (
              <Link href={`/patient?id=${params.row.id}`} passHref> 
                  <Button size="small" variant="contained" sx={{ width: 200, margin: 2 }} >
                      View Records
                  </Button>
              </Link>
          );
      },
  })

  return (
      <Stack spacing={4} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h6" gutterBottom>
              Select a patient to get started.
          </Typography>
          <div style={{ width: '50%' }}>
              <DataGrid
                  rows={rows}
                  columns={columns.filter((column) => column.field !== 'id')}
                  disableRowSelectionOnClick
                  getRowId={getRowId}
                  initialState={{
                      pagination: {
                          paginationModel: { page: 0, pageSize: 10 },
                      },
                  }}
                  pageSizeOptions={[5, 10]}
              />
          </div>
      </Stack>
  );
}