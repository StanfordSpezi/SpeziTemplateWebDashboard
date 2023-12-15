/*

This source file is part of the Stanford Spezi Template Web Dashboard open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/

'use client';

import { useState, useEffect } from 'react';
import { db } from '../CloudStorageConnector/firebase';
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore';

export interface QuestionnaireResponseInfo {
    questionnaireResponseDataList: QuestionnaireResponseData[];
    loading: boolean;
  }
  
  type QuestionnaireResponseData = Record<string, any>;
  

// call function on specific userId 
export function ExtractPHQDataFromFirebase(userId: string): QuestionnaireResponseInfo {
  const [questionnaireResponseDataList, setQuestionnaireResponseDataList] = useState<QuestionnaireResponseData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHealthKitData = async () => {
      try {
        // adjust the path to match your database structure
        const questionnaireResponseRef = collection(db, 'users', userId, 'QuestionnaireResponse');
        const querySnapshot = await getDocs(questionnaireResponseRef);
        const questionnaireResponseData: QuestionnaireResponseData[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
            if (data.valueQuantity && data.valueQuantity.unit === 'steps') {
              console.log("data", data);
              // push whole document
              questionnaireResponseData.push(data);
            }
        });
        setQuestionnaireResponseDataList(questionnaireResponseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching QuestionnaireResponse data', error);
        setLoading(false);
      }
    };

    getHealthKitData();
  }, [userId]); // re-run when the userId changes

  return { questionnaireResponseDataList:  questionnaireResponseDataList, loading: loading };
}
