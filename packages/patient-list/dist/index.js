"use strict";
//
// This source file is part of the Stanford Spezi Template Web Dashboard open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Docs for Example module
 * @packageDocumentation
 */
/**
 * Docs for `PatientList` component.
 */
var React = require("react");
var x_data_grid_1 = require("@mui/x-data-grid");
var material_1 = require("@mui/material");
var link_1 = __importDefault(require("next/link"));
function PatientList(_a) {
    var rows = _a.rows;
    var getRowId = function (row) { return row.id; };
    // auto detect columns from rows
    var columns = [];
    Object.keys(rows[0]).forEach(function (key) {
        console.log(key);
        columns.push({ field: key, headerName: key, type: "string" });
    });
    // add button to link to patient's data dashboard 
    columns.push({
        field: 'records',
        headerName: '',
        flex: 1,
        renderCell: function (params) {
            console.log("patient row params", params.row);
            return (React.createElement(link_1.default, { href: "/patient?id=".concat(params.row.id), passHref: true },
                React.createElement(material_1.Button, { size: "small", variant: "contained", sx: { width: 200, margin: 2 } }, "View Records")));
        },
    });
    return (React.createElement(material_1.Stack, { spacing: 4, sx: { display: "flex", alignItems: "center", justifyContent: "center" } },
        React.createElement(material_1.Typography, { variant: "h6", gutterBottom: true }, "Select a patient to get started."),
        React.createElement("div", { style: { width: '50%' } },
            React.createElement(x_data_grid_1.DataGrid, { rows: rows, columns: columns.filter(function (column) { return column.field !== 'id'; }), disableRowSelectionOnClick: true, getRowId: getRowId, initialState: {
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }, pageSizeOptions: [5, 10] }))));
}
exports.default = PatientList;
