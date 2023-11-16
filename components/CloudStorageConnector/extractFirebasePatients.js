import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebase.js';

// extract patient information from Firestore collection 
// assumes collection name is "patients", assumes id, firstName, lastName fields - modify if needed 
export default function extractFirebasePatients() {
    const [patientList, setPatientList] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const getPatients = async () => {
            try {
                const ref = collection(db, "patients")
                const querySnapshot = await getDocs(ref);
                const patients = [];
                querySnapshot.forEach((doc) => {
                    const patientData = doc.data();
                    patients.push(
                        {
                            firstName: patientData.firstName,
                            lastName: patientData.lastName,
                            id: patientData.id
                        });
                });
                setPatientList(patients);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching patients", error);
                setLoading(false);
            }
        };
        getPatients();
    }, [])

    return {patientList, loading};
}

