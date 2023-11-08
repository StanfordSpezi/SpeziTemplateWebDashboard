
import PatientList from '@stanfordspezi/patient-list'

import { extractPatientsFromFirebase } from '@stanfordspezi/cloud-storage-connector'
import { Typography} from '@mui/material';
import Header from '../components/Header';

// display list of patients from Firebase in table 
export default function PatientsPage() {
    const { patientList, loading } = extractPatientsFromFirebase();
    return (
        <div>
            <Header></Header>
            {loading ? (
                <Typography>Loading....</Typography>
            ) : (
                <PatientList rows={patientList}  />
            )}
        </div>
    );
}