/*

This source file is part of the Stanford Spezi SMART-on-FHIR open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/

import { useEffect } from "react";
import FHIR from "fhirclient";
import Loading from '../components/Loading';

export default function Launcher() {
    useEffect(() => {
        // FHIR.oauth2.authorize({
        //     clientId: process.env.REACT_APP_SMART_CLIENTID,
        //     clientSecret: process.env.REACT_APP_SMART_CLIENTSECRET,
        //     scope: process.env.REACT_APP_SMART_SCOPE,
        //     redirectUri: '/',
        //     completeInTarget: true
        // });
        FHIR.oauth2.authorize({
            clientId: "",
            clientSecret: "",
            scope: "openid fhirUser profile api:fhir user/Observation.read user/Patient.read user/MedicationRequest.read offline_access launch",
            redirectUri: '/',
            completeInTarget: true
        });
    }, []);

    return <Loading />;
};