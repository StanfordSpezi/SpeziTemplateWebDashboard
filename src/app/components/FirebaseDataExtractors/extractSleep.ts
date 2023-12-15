/*

This source file is part of the Stanford Spezi Template Web Dashboard open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/

'use client';

import { useState, useEffect } from 'react';
import { db } from '../CloudStorageConnector/firebase';
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore';

export interface HealthKitSleepInfo {
  healthKitSleepDataList: HealthKitSleepData[];
  loading: boolean;
}

interface HealthKitSleepData {
  effectiveDateTime: string;
  id: string;
  hours: number; 
}

// call function on specific userId 
export function ExtractHealthKitSleepDataFromFirebase(userId: string): HealthKitSleepInfo {
  const [healthKitSleepDataList, setHealthKitSleepDataList] = useState<HealthKitSleepData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHealthKitSleepData = async () => {
      try {
        // Adjust the path to match your database structure
        const healthKitRef = collection(db, 'users', userId, 'HealthKit');
        const querySnapshot = await getDocs(healthKitRef);
        const healthKitSleepData: HealthKitSleepData[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
            if (data.valueQuantity && data.valueQuantity.unit === 'hours') {
              console.log("data", data);
              // assumes time value in hours 
              healthKitSleepData.push({
                effectiveDateTime: data.effectiveDateTime,
                id: data.id,
                hours: data.valueQuantity.value,
              });
            }
        });
        setHealthKitSleepDataList(healthKitSleepData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching HealthKit sleep data', error);
        setLoading(false);
      }
    };

    getHealthKitSleepData();
  }, [userId]); // re-run when the userId changes

  return { healthKitSleepDataList: healthKitSleepDataList, loading: loading };
}
