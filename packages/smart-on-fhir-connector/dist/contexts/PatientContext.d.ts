import React = require('react');
import { ReactNode } from 'react';
import { Patient } from 'fhir/r4';
interface PatientProviderProps {
    children: ReactNode;
}
export declare const PatientContext: React.Context<Patient>;
export declare const usePatient: () => Patient | null;
export declare const PatientProvider: React.FC<PatientProviderProps>;
export {};
//# sourceMappingURL=PatientContext.d.ts.map