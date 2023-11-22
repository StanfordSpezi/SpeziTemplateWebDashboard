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
exports.UserLoginRegister = exports.AuthProvider = exports.useAuth = void 0;
/**
 * Docs for Example module
 * @packageDocumentation
 */
/**
 * Docs for `UserLoginRegister` function.
 */
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var GoogleSignIn_1 = __importDefault(require("./GoogleSignIn"));
var router_1 = require("next/router");
var AuthContext_1 = require("./contexts/AuthContext");
var material_1 = require("@mui/material");
var styles_1 = require("@mui/material/styles");
var AuthContext_2 = require("./contexts/AuthContext");
Object.defineProperty(exports, "useAuth", { enumerable: true, get: function () { return AuthContext_2.useAuth; } });
var AuthContext_3 = require("./contexts/AuthContext");
Object.defineProperty(exports, "AuthProvider", { enumerable: true, get: function () { return AuthContext_3.AuthProvider; } });
// Combined login-register component 
function UserLoginRegister(_a) {
    var includeGoogle = _a.includeGoogle;
    var _b = (0, react_2.useState)(null), message = _b[0], setMessage = _b[1];
    var _c = (0, react_2.useState)(true), logInScreen = _c[0], changeToLogInScreen = _c[1];
    var _d = (0, react_2.useState)(""), firstName = _d[0], changeFirstName = _d[1];
    var _e = (0, react_2.useState)(""), lastName = _e[0], changeLastName = _e[1];
    var _f = (0, react_2.useState)(""), password1 = _f[0], changePassword1 = _f[1];
    var _g = (0, react_2.useState)(""), password2 = _g[0], changePassword2 = _g[1];
    var _h = (0, react_2.useState)(""), email = _h[0], changeEmail = _h[1];
    var _j = (0, react_2.useState)(null), loggedInUser = _j[0], setLoggedInUser = _j[1];
    var defaultTheme = (0, styles_1.createTheme)();
    var router = (0, router_1.useRouter)();
    var _k = (0, AuthContext_1.useAuth)(), handleSignIn = _k.handleSignIn, handleSignUp = _k.handleSignUp;
    return (react_1.default.createElement(styles_1.ThemeProvider, { theme: defaultTheme },
        react_1.default.createElement(material_1.Grid, { container: true, component: "main", sx: { height: '60vh', width: '100vh' } },
            react_1.default.createElement(material_1.CssBaseline, null),
            react_1.default.createElement(material_1.Grid, { item: true, xs: false, sm: 4, md: 7, sx: {
                    overflowY: 'auto',
                    display: "flex",
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: function (t) {
                        return t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900];
                    },
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                } }),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 12, sm: 8, md: 5, component: material_1.Paper, elevation: 6, square: true },
                react_1.default.createElement(material_1.Box, { sx: {
                        my: 'auto',
                        mx: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    } },
                    react_1.default.createElement(material_1.Avatar, { sx: { m: 1 } }),
                    react_1.default.createElement(material_1.Typography, { component: "h1", variant: "h5" }, logInScreen === true ? "Sign In" : "Sign Up"),
                    react_1.default.createElement(material_1.Box, { component: "form", noValidate: true, sx: {
                            mt: 1, display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        } },
                        logInScreen === false ?
                            (react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 },
                                react_1.default.createElement(material_1.Grid, { item: true, xs: 12, sm: 6 },
                                    react_1.default.createElement(material_1.TextField, { name: "first_name", required: true, fullWidth: true, id: "firstName", label: "First Name", onChange: function (event) { return changeFirstName(event.target.value); }, autoFocus: true })),
                                react_1.default.createElement(material_1.Grid, { item: true, xs: 12, sm: 6 },
                                    react_1.default.createElement(material_1.TextField, { required: true, fullWidth: true, id: "lastName", label: "Last Name", name: "last_name", onChange: function (event) { return changeLastName(event.target.value); } }))))
                            : null,
                        react_1.default.createElement(material_1.TextField, { margin: "normal", required: true, fullWidth: true, id: "email", label: logInScreen ? "Email" : "Enter email", name: "email", onChange: function (event) { return changeEmail(event.target.value); } }),
                        react_1.default.createElement(material_1.TextField, { margin: "normal", required: true, fullWidth: true, name: "password", label: "Choose a password", type: "password", id: "password1", onChange: function (event) { return changePassword1(event.target.value); } }),
                        logInScreen ? null :
                            (react_1.default.createElement(material_1.TextField, { margin: "normal", required: true, fullWidth: true, name: "repeat_password", label: "Confirm Password", type: "password", id: "password2", onChange: function (event) { return changePassword2(event.target.value); }, helperText: password1 !== password2 && 'Passwords do not match' })),
                        react_1.default.createElement(material_1.Button, { disabled: logInScreen
                                ? !email || !password1
                                : !firstName || !lastName || !email || !password1 || !password2, onClick: function () { return (logInScreen ? handleSignIn(email, password1, router, setLoggedInUser, setMessage)
                                : handleSignUp(email, password2, setMessage)); }, fullWidth: true, variant: "contained", sx: { mt: 3, mb: 2 } }, logInScreen === true ? "Sign In" : "Sign Up"),
                        includeGoogle === true ? react_1.default.createElement(GoogleSignIn_1.default, null) : null,
                        react_1.default.createElement(material_1.Typography, { variant: "caption", color: "success" }, message),
                        react_1.default.createElement(material_1.Grid, { container: true },
                            react_1.default.createElement(material_1.Grid, { item: true },
                                react_1.default.createElement(material_1.Button, { variant: "text", onClick: function () {
                                        changeToLogInScreen(!logInScreen);
                                        setMessage(null);
                                    } }, logInScreen === true ? "Sign Up" : "Sign In")))))))));
}
exports.UserLoginRegister = UserLoginRegister;
