/**
 * Docs for Example module
 * @packageDocumentation
 */
/**
 * Docs for `smart-on-fhir` package for extracting different FHIR
 * resources from EHR.
 */
import Client from "fhirclient/lib/Client";
import { Coding, Practitioner, Patient } from 'fhir/r4';
import Launcher from "./Launcher";
export { Launcher };
export declare const getAllResources: (client: Client) => Promise<any>;
export declare const getAllMedications: (client: Client) => Promise<any>;
export declare const getMedicationName: (codings: Coding[]) => string;
export declare const formatName: (resource: Practitioner | Patient) => string;
//# sourceMappingURL=index.d.ts.map