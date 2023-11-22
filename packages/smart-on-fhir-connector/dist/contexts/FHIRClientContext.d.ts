import React = require('react');
import { ReactNode } from 'react';
import Client from 'fhirclient/lib/Client';
interface FHIRClientProviderProps {
    children: ReactNode;
}
export declare const FHIRClientContext: React.Context<Client>;
export declare const useFHIRClient: () => Client;
export declare const FHIRClientProvider: React.FC<FHIRClientProviderProps>;
export {};
//# sourceMappingURL=FHIRClientContext.d.ts.map