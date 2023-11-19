/*

This source file is part of the Stanford Spezi Template Web Dashboard open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/


import PatientList from '../components/PatientList';
import {extractPatientsFromFirebase} from '../components/CloudStorageConnector';
import { Typography} from '@mui/material';
import Header from '../components/Header';

// display list of patients from Firebase in table 
export default function PatientsPage() {
    const { patientList, loading } = extractPatientsFromFirebase();
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
}