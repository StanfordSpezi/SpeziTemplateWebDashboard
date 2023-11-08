"use strict";
/*

This source file is part of the Stanford Spezi SMART-on-FHIR open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
   
*/
Object.defineProperty(exports, "__esModule", { value: true });
var react_bootstrap_1 = require("react-bootstrap");
// import logo from '../public/spezi_logo.png';
var Loading = function () {
    return (React.createElement(react_bootstrap_1.Container, null,
        React.createElement(react_bootstrap_1.Row, null,
            React.createElement("div", { className: "mx-auto mt-5 mb-5 text-center", style: { width: '500px' } },
                React.createElement("br", null),
                React.createElement("h2", null, "Spezi"),
                React.createElement("br", null),
                React.createElement("h4", { className: "lead" }, "Loading Spezi dashboard..."),
                React.createElement("br", null),
                React.createElement(react_bootstrap_1.Spinner, { animation: "border", role: "status" })))));
};
exports.default = Loading;
