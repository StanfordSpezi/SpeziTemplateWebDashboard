
import PatientList from '../components/PatientList';
import { extractPatientsFromFirebase } from '../components/CloudStorageConnector';
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