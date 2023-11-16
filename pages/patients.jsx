
import PatientList from '../components/PatientList';
import extractFirebasePatients from '../components/CloudStorageConnector/extractFirebasePatients';
import { Typography} from '@mui/material';
import Header from '../components/Header';

// display list of patients from Firebase in table 
export default function PatientsPage() {
    const { patientList, loading } = extractFirebasePatients();
    return (
        <div>
            <Header></Header>
            {loading ? (
                <Typography>Loading....</Typography>
            ) : (
                <PatientList rows={patientList} style={{ display: "flex", marginTop: 40 }}  />
            )}
        </div>
    );
}