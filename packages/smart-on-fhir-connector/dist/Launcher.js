"use strict";
/*

This source file is part of the Stanford Spezi SMART-on-FHIR open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var fhirclient_1 = __importDefault(require("fhirclient"));
var Loading_1 = __importDefault(require("./Loading"));
function Launcher() {
    (0, react_2.useEffect)(function () {
        fhirclient_1.default.oauth2.authorize({
            clientId: process.env.REACT_APP_SMART_CLIENTID,
            clientSecret: process.env.REACT_APP_SMART_CLIENTSECRET,
            scope: process.env.REACT_APP_SMART_SCOPE,
            redirectUri: '/',
            completeInTarget: true
        });
    }, []);
    return react_1.default.createElement(Loading_1.default, null);
}
exports.default = Launcher;
;
