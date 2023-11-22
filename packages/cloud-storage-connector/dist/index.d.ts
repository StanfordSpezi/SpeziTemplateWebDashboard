/**
 * Return a list of patient objects and an indicator to check status of
 * data loading.
 */
export interface PatientInfo {
    patientList: Patient[];
    loading: boolean;
}
type Patient = {
    firstName: string;
    lastName: string;
    id: string;
};
export { auth } from './firebase';
export declare function extractPatientsFromFirebase(): PatientInfo;
//# sourceMappingURL=index.d.ts.map