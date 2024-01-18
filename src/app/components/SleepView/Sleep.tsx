import { useState, useEffect } from 'react';
import SleepChart from './SleepChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Bundle, Observation } from 'fhir/r4';
import { Typography, Card } from '@mui/material';
interface SleepProps {
    observationBundle: Bundle<Observation>;
}

const Sleep: React.FC<SleepProps> = ({ observationBundle }) => {
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);

    useEffect(() => {
        if (observationBundle?.entry && observationBundle?.entry.length > 0) {
            const timestamps = observationBundle?.entry.map(observation => new Date(observation.resource.effectiveDateTime).getTime());
            const minTimestamp = Math.min(...timestamps);
            const maxTimestamp = Math.max(...timestamps);
            setStart(new Date(minTimestamp));
            setEnd(new Date(maxTimestamp));

        }
    }, [observationBundle]);

    return (
        <Card
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: 3,
            }}
        >
            <Typography className="lead">Sleep Duration</Typography>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px' }}>
                <DatePicker selected={start} onChange={(date) => setStart(date ?? start)} />
                <div style={{ margin: '0 10px' }}>to</div>
                <DatePicker selected={end} onChange={(date) => setEnd(date ?? end)} />
            </div>
            <SleepChart observations={observationBundle?.entry ?? []} startDate={start} endDate={end} />
        </Card>
    )
};

export default Sleep;