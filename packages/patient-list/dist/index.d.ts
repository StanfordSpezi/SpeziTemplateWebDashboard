/**
 * Docs for Example module
 * @packageDocumentation
 */
/**
 * Docs for `PatientList` component.
 */
import React = require('react');
type Patient = {
    firstName: string;
    lastName: string;
    id: string;
};
type PatientList = {
    rows: Patient[];
};
export default function PatientList({ rows }: PatientList): React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map