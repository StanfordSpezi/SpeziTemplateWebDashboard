/*

This source file is part of the Stanford Spezi Template Web Dashboard open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/

'use client';

import PatientList from '../components/PatientList';
import { ExtractPatientsFromFirebase } from '../components/CloudStorageConnector';
import { Typography } from '@mui/material';
import Header from '../components/Header';
import withAuth from '../components/Auth/withAuth';

// display list of patients from Firebase in table
const PatientsPage = () => {
  const { patientList, loading } = ExtractPatientsFromFirebase();

  return (
    <div>
      <Header></Header>
      {loading ? (
        <Typography>Loading....</Typography>
      ) : (
        <PatientList rows={patientList} />
      )}
    </div>
  );
};

export default withAuth(PatientsPage, '/');
