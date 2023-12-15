import { Card, Container } from 'react-bootstrap';
import ECGChart from './ECGChart';
import { Typography } from '@mui/material';
import getVoltageData from './getVoltageData';

interface ECGProps {
    observationData: Record<string, any>;
}


const ECG: React.FC<ECGProps> = ({ observationData }) => {
    const voltageData = getVoltageData(observationData);
    return (
        <Card className="p-2 m-2 d-flex flex-column align-items-center justify-content-center shadow">
            <Typography className="lead">ECG Data</Typography>
            <Container>
                <ECGChart data={voltageData[0]} />
                <ECGChart data={voltageData[1]} />
                <ECGChart data={voltageData[2]} />
            </Container>
        </Card>
    )
};
export default ECG;
