/*

This source file is part of the Stanford Spezi Template Web Dashboard open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/

'use client';

import { useState, useEffect } from 'react';
import { db } from '../CloudStorageConnector/firebase';
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore';

export interface HealthKitStepInfo {
  healthKitStepDataList: HealthKitStepData[];
  loading: boolean;
}

interface HealthKitStepData {
  effectiveDateTime: string;
  id: string;
  stepCount: number; 
}

// call function on specific userId 
export function ExtractHealthKitStepDataFromFirebase(userId: string): HealthKitStepInfo {
  const [healthKitStepDataList, setHealthKitStepDataList] = useState<HealthKitStepData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHealthKitStepData = async () => {
      try {
        // Adjust the path to match your database structure
        const healthKitStepRef = collection(db, 'users', userId, 'HealthKit');
        const querySnapshot = await getDocs(healthKitStepRef);
        const healthKitStepData: HealthKitStepData[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
            if (data.valueQuantity && data.valueQuantity.unit === 'steps') {
              console.log("data", data);
              // assumes outer level step count data 
              healthKitStepData.push({
                effectiveDateTime: data.effectiveDateTime,
                id: data.id,
                stepCount: data.valueQuantity.value,
              });
            }
        });
        setHealthKitStepDataList(healthKitStepData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching HealthKit Step data', error);
        setLoading(false);
      }
    };

    getHealthKitStepData();
  }, [userId]); // re-run when the userId changes

  return { healthKitStepDataList: healthKitStepDataList, loading: loading };
}
