import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { Card, Typography, Stack } from '@mui/material';
import { calculateAverage, calculateMedian, calculateStandardDeviation } from '../../functions/stats'

interface StepCountData {
  effectiveDateTime: string;
  id: string;
  stepCount: number;
}
interface StepCountChartProps {
  observations: StepCountData[];
  startDate: string | Date;
  endDate: string | Date;

}

const StepCountChart: React.FC<StepCountChartProps> = ({ observations, startDate, endDate }) => {
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  const aggregatedData = observations.reduce((acc, observation) => {
    const date = new Date(observation.effectiveDateTime);
    let formattedDate;


    // Logic for redisplaying single day data on hourly distribution 
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const isSingleDay = endDate.getTime() - startDate.getTime() <= oneDayInMs;
    if (isSingleDay) {
      // Format the hour for 12-hour format with AM/PM
      const hours = date.getHours();
      const isPM = hours >= 12;
      const formattedHour = hours % 12 === 0 ? 12 : hours % 12; // Convert 0 to 12 for 12 AM
      formattedDate = `${formattedHour} ${isPM ? 'PM' : 'AM'}`;
    } else {
      // Aggregate by day otherwise
      formattedDate = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
    }

    if (date >= startDate && date <= endDate) {
      if (!acc[formattedDate]) {
        acc[formattedDate] = { date: formattedDate, steps: 0 };
      }
      acc[formattedDate].steps += observation.stepCount;
    }
    return acc;
  }, {});

  const sortedData = Object.values(aggregatedData).sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  console.log(sortedData);

  let averageSteps = calculateAverage(sortedData.map(item => item.steps), 2);
  let medianSteps = calculateMedian(sortedData.map(item => item.steps));
  let standardDevSteps = calculateStandardDeviation(sortedData.map(item => item.steps), 2);



  return (
    <Stack sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    }}>

      <ResponsiveContainer width='80%' height={400}>
        <BarChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="steps" fill="#4ec78e" />
        </BarChart>
      </ResponsiveContainer>

      <Stack spacing={2} padding={2}>
        <Stack>
          <Typography>Summary Statistics</Typography>
          <Typography variant="caption">*for range shown</Typography>
        </Stack>

        <Card sx={{ padding: 2 }}>
          <Typography>Mean: {averageSteps}</Typography>
          <Typography>Median: {medianSteps}</Typography>
          <Typography> Standard Deviation: {standardDevSteps}</Typography>
        </Card>
      </Stack>
    </Stack>
  );
};

export default StepCountChart;
