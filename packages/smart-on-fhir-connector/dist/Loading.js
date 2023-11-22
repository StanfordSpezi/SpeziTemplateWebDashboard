"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*

This source file is part of the Stanford Spezi SMART-on-FHIR open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/
var react_1 = __importDefault(require("react"));
var react_bootstrap_1 = require("react-bootstrap");
// import logo from '../public/spezi_logo.png';
var Loading = function () {
    return (react_1.default.createElement(react_bootstrap_1.Container, null,
        react_1.default.createElement(react_bootstrap_1.Row, null,
            react_1.default.createElement("div", { className: "mx-auto mt-5 mb-5 text-center", style: { width: '500px' } },
                react_1.default.createElement("br", null),
                react_1.default.createElement("h2", null, "Spezi"),
                react_1.default.createElement("br", null),
                react_1.default.createElement("h4", { className: "lead" }, "Loading Spezi dashboard..."),
                react_1.default.createElement("br", null),
                react_1.default.createElement(react_bootstrap_1.Spinner, { animation: "border", role: "status" })))));
};
exports.default = Loading;
