"use strict";
/*

This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FHIRClientProvider = exports.useFHIRClient = exports.FHIRClientContext = void 0;
var React = require("react");
var react_1 = require("react");
var fhirclient_1 = __importDefault(require("fhirclient"));
var Loading_1 = __importDefault(require("../Loading"));
exports.FHIRClientContext = (0, react_1.createContext)(null);
var useFHIRClient = function () { return (0, react_1.useContext)(exports.FHIRClientContext); };
exports.useFHIRClient = useFHIRClient;
var FHIRClientProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(null), client = _b[0], setClient = _b[1];
    (0, react_1.useEffect)(function () {
        fhirclient_1.default.oauth2.ready()
            .then(function (client) { return setClient(client); })
            .catch(console.error);
    }, []);
    return (client ?
        React.createElement(exports.FHIRClientContext.Provider, { value: client }, children)
        : React.createElement(Loading_1.default, null));
};
exports.FHIRClientProvider = FHIRClientProvider;
