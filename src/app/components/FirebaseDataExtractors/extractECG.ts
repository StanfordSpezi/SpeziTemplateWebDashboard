/*

This source file is part of the Stanford Spezi Template Web Dashboard open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/

'use client';

import { useState, useEffect } from 'react';
import { db } from '../CloudStorageConnector/firebase';
import { collection, getDocs} from 'firebase/firestore';

export interface HealthKitECGInfo {
  healthKitECGDataList: HealthKitECGData[];
  loading: boolean;
}

type HealthKitECGData = Record<string, any>;

// call function on specific userId 
export function ExtractHealthKitStepDataFromFirebase(userId: string): HealthKitECGInfo {
  const [healthKitECGDataList, setHealthKitECGDataList] = useState<HealthKitECGData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHealthKitECGData = async () => {
      try {
        // Adjust the path to match your database structure
        const healthKitRef = collection(db, 'users', userId, 'HealthKit');
        const querySnapshot = await getDocs(healthKitRef);
        const healthKitECGData: HealthKitECGData[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
            if (data.code.coding[0].display === 'Electrocardiogram') {
              console.log("data", data);
              // push whole document
              healthKitECGData.push(data);
            }
        });
        setHealthKitECGDataList(healthKitECGData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching HealthKit ECG data', error);
        setLoading(false);
      }
    };

    getHealthKitECGData();
  }, [userId]); // re-run when the userId changes

  return { healthKitECGDataList: healthKitECGDataList, loading: loading };
}
