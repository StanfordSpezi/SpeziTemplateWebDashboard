import React, { useState } from 'react';
import { Tabs, Tab, Box, Container, Grid } from '@mui/material';
import Activity from './ActivityView/Activity';
import PHQ9 from './PHQView/PHQ9';
import Sleep from './SleepView/Sleep';
import sleep from '../data/sleep.json';
import phq9responses from '../data/phq9responses.json';
import { Bundle, Observation, QuestionnaireResponse } from 'fhir/r4';
import { ExtractHealthKitStepDataFromFirebase } from './FirebaseDataExtractors/extractSteps';


const TabbedInterface = () => {
  const [activeTab, setActiveTab] = useState('activity');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const userId = "zudvSaW1Rac4npnxwjnBpfBiUFD2"; // Replace with the actual user ID
  const { healthKitStepDataList, loading } = ExtractHealthKitStepDataFromFirebase(userId);
  // const { healthKitSleepDataList, loading } = ExtractHealthKitSleepDataFromFirebase(userId);
  // const { healthKitECGDataList, loading } = ExtractHealthKitECGDataFromFirebase(userId);


  return (
    <Container style={{ marginTop: '6em' }}>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="PHQ-9" value="phq9" />
            <Tab label="Activity" value="activity" />
            <Tab label="Sleep" value="sleep" />
             
            </Tabs>
          </Box>
          {activeTab === 'phq9' && (
            <PHQ9 responsesBundle={phq9responses as Bundle<QuestionnaireResponse>} />
          )}
          {activeTab === 'sleep' && (
            <Sleep observationBundle={sleep as Bundle<Observation>} />
          )}
          {activeTab === 'activity' && (
            <Activity observationData={healthKitStepDataList} />          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default TabbedInterface;
