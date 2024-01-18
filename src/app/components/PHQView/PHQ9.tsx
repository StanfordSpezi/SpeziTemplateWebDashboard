import PHQ9ResultsTable from './PHQ9ResultsTable';
import { Bundle, QuestionnaireResponse } from 'fhir/r4';
import React from 'react';
import { Typography, Card } from '@mui/material';

interface PHQ9Props {
    responsesBundle: Bundle<QuestionnaireResponse>;
}

const PHQ9: React.FC<PHQ9Props> = ({ responsesBundle }) => {
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
        <Typography className="lead">PHQ-9 Responses</Typography>
            <div style={{ overflowX: 'auto', width: '100%' }}>
                <PHQ9ResultsTable responses={responsesBundle?.entry ?? []} />
            </div>
        </Card>
    )
}

export default PHQ9;