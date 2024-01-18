import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BundleEntry, Observation } from 'fhir/r4';
import { calculateAverage, calculateMedian, calculateStandardDeviation } from '../../functions/stats'
import { Card, Typography, Stack } from '@mui/material';

interface SleepChartProps {
    observations: BundleEntry<Observation>[];
    startDate: string | Date;
    endDate: string | Date;
}

const SleepChart: React.FC<SleepChartProps> = ({ observations, startDate, endDate }) => {
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    // Filter and map FHIR Observation resources to chart data
    const data = observations
        .filter(observation => {
            if (observation.resource?.effectiveDateTime) {
                const obsDate = new Date(observation.resource.effectiveDateTime);
                return obsDate >= startDate && obsDate <= endDate;
            }
            return null;
        })
        .map(observation => {
            if (observation.resource?.effectiveDateTime && observation.resource?.valueQuantity?.value) {
                const date = new Date(observation.resource.effectiveDateTime);
                return {
                    date: `${date.getMonth() + 1}/${date.getDate()}`,
                    hoursSlept: observation.resource.valueQuantity.value
                };
            } else {
                return null;
            }
        });
    let averageHours = calculateAverage(data.map(item => item.hoursSlept), 2);
    let medianHours = calculateMedian(data.map(item => item.hoursSlept));
    let standardDevHours = calculateStandardDeviation(data.map(item => item.hoursSlept), 2);


    return (
        <Stack sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <ResponsiveContainer width={'99%'} height={400}>
                <BarChart width={600} height={400} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hoursSlept" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
            <Stack spacing={2} padding={2}>
                <Stack>
                    <Typography>Summary Statistics</Typography>
                    <Typography variant="caption">*for range shown</Typography>
                </Stack>
                <Card sx={{ padding: 2 }}>
                    <Typography>Mean: {averageHours}</Typography>
                    <Typography>Median: {medianHours}</Typography>
                    <Typography> Standard Deviation: {standardDevHours}</Typography>
                </Card>
            </Stack>
        </Stack>
    );
};

export default SleepChart;