import { useState, useEffect } from 'react';
import { Card, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import StepCountChart from './StepCountChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ActivityProps {
    observationData: { effectiveDateTime: string; id: string; stepCount: number }[];
}

const Activity: React.FC<ActivityProps> = ({ observationData }) => {
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);
    const [selectionMode, setSelectionMode] = useState('range'); // 'single' or 'range'

    useEffect(() => {
        if (observationData && observationData.length > 0) {
            const timestamps = observationData.map(obs => new Date(obs.effectiveDateTime).getTime());
            const minTimestamp = Math.min(...timestamps);
            const maxTimestamp = Math.max(...timestamps);

            if (selectionMode === 'range') {
                setStart(new Date(minTimestamp));
                setEnd(new Date(maxTimestamp));
            }
            if (selectionMode === 'single') {
                setStart(new Date(minTimestamp));
                const nextDay = new Date(minTimestamp);
                nextDay.setDate(nextDay.getDate() + 1); // Increment the day by one
                setEnd(nextDay);
            }


        }
    }, [observationData, selectionMode]);

    const handleDateChange = (date: Date | null) => {
        setStart(date);
        if (selectionMode === 'single' && date) {
            const nextDay = new Date(date);
            nextDay.setDate(nextDay.getDate() + 1); // Increment the day by one
            setEnd(nextDay);
        }
    };

    const handleDaySelected = (selectedDate: Date) => {
        setSelectionMode('single');
        setStart(selectedDate);
        const nextDay = new Date(selectedDate);
        nextDay.setDate(nextDay.getDate() + 1);
        setEnd(nextDay);
    };
    

    const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMode = event.target.value;
        setSelectionMode(newMode);

        if (newMode === 'single' && start) {
            setEnd(start);
        } else if (newMode === 'range' && observationData && observationData.length > 0) {
            const timestamps = observationData.map(obs => new Date(obs.effectiveDateTime).getTime());
            setStart(new Date(Math.min(...timestamps)));
            setEnd(new Date(Math.max(...timestamps)));
        }
    };
    return (
        <Card className="p-2 m-2 d-flex flex-column align-items-center justify-content-center shadow">
    <Typography>Steps</Typography>
    <Typography variant="caption">Data is aggregated by default. Click on a bar for hourly data</Typography>

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginBottom: '20px' }}>
        <RadioGroup row value={selectionMode} onChange={(e) => setSelectionMode(e.target.value)}>
            <FormControlLabel value="single" control={<Radio />} label="Select a Day" />
            <FormControlLabel value="range" control={<Radio />} label="Select a Date Range" />
        </RadioGroup>
        <div style={{ display: 'flex' }}>
            <DatePicker selected={start} onChange={handleDateChange} />
            {selectionMode === 'range' && (
                <>
                    <div style={{ margin: '0 10px' }}>to</div>
                    <DatePicker selected={end} onChange={date => setEnd(date)} />
                </>
            )}
        </div>
    </div>
    <StepCountChart 
        observations={observationData} 
        startDate={start ?? new Date()} 
        endDate={end ?? new Date()} 
    />
</Card>

    )
};

export default Activity;
