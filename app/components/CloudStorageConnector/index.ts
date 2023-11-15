//
// This source file is part of the Stanford Spezi Template Web Dashboard open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

/**
 * Docs for Example module
 * @packageDocumentation
 */

/**
 * Docs for `extractPatientsFromFirebase` function.
 */

// 'use client'

import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';

/**
 * Return a list of patient objects and an indicator to check status of
 * data loading.
 */
export interface PatientInfo {
    patientList: Patient[]
    loading: boolean
  }
// edit fields if needed
type Patient = {
    firstName: string;
    lastName: string;
    id: string;
}
    
// assumes "patients" collection in Firebase
export function extractPatientsFromFirebase(): PatientInfo {
  const [patientList, setPatientList] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
      const getPatients = async () => {
          try {
              const ref = collection(db, "patients")
              const querySnapshot = await getDocs(ref);
              const patients: Patient[] = [];              querySnapshot.forEach((doc) => {
                  const patientData = doc.data();
                  patients.push(
                      {
                          firstName: patientData.firstName,
                          lastName: patientData.lastName,
                          id: patientData.id
                      });
              });
              setPatientList(patients);
              setLoading(false);
          } catch (error) {
              console.error("Error fetching patients", error);
              setLoading(false);
          }
      };
      getPatients();
  }, [])

   return {patientList: patientList, loading: loading};
}

