"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = exports.useAuth = void 0;
var react_1 = __importStar(require("react"));
var auth_1 = require("firebase/auth");
var cloud_storage_connector_1 = require("@stanfordspezi/cloud-storage-connector");
var AuthContext = react_1.default.createContext(undefined);
function useAuth() {
    return (0, react_1.useContext)(AuthContext);
}
exports.useAuth = useAuth;
function AuthProvider(_a) {
    var _this = this;
    var children = _a.children;
    var _b = (0, react_1.useState)(), currentUser = _b[0], setCurrentUser = _b[1];
    var _c = (0, react_1.useState)(false), isAdmin = _c[0], setIsAdmin = _c[1];
    var _d = (0, react_1.useState)(true), loading = _d[0], setLoading = _d[1];
    var handleSignUp = function (email, password, setMessage) { return __awaiter(_this, void 0, void 0, function () {
        var userCredential, user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, auth_1.createUserWithEmailAndPassword)(cloud_storage_connector_1.auth, email, password)];
                case 1:
                    userCredential = _a.sent();
                    user = userCredential.user;
                    console.log('User signed up:', user);
                    setMessage('Account created successfully. Click Sign In.');
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Sign-up failed:', error_1.message);
                    setMessage('Sign-up failed. Please try again.');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleSignIn = function (email, password, router, setLoggedInUser, setMessage) { return __awaiter(_this, void 0, void 0, function () {
        var userCredential, user, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, auth_1.signInWithEmailAndPassword)(cloud_storage_connector_1.auth, email, password)];
                case 1:
                    userCredential = _a.sent();
                    user = userCredential.user;
                    console.log('User signed in:', user);
                    setLoggedInUser(user);
                    router.push('/patients');
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Sign-in failed:', error_2.message);
                    setMessage('Login failed. Please check your email and password.');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleSignOut = function (router) { return __awaiter(_this, void 0, void 0, function () {
        var userCredential, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log('User to sign out:', cloud_storage_connector_1.auth.currentUser);
                    return [4 /*yield*/, (0, auth_1.signOut)(cloud_storage_connector_1.auth)];
                case 1:
                    userCredential = _a.sent();
                    router.push('/');
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error('Sign-out failed:', error_3.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var resetPassword = function (email) { return (0, auth_1.sendPasswordResetEmail)(cloud_storage_connector_1.auth, email); };
    var updateEmail = function (email) { return currentUser.updateEmail(email); };
    var updatePassword = function (password) { return currentUser.updatePassword(password); };
    (0, react_1.useEffect)(function () {
        var unsubscribe = cloud_storage_connector_1.auth.onAuthStateChanged(function (user) {
            setCurrentUser(user);
            if (cloud_storage_connector_1.auth.currentUser) {
                cloud_storage_connector_1.auth.currentUser.getIdTokenResult()
                    .then(function (result) {
                    if (result.claims.role === "admin") {
                        setIsAdmin(true);
                    }
                    else {
                        setIsAdmin(false);
                    }
                });
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);
    var value = (0, react_1.useMemo)(function () { return ({
        currentUser: currentUser,
        isAdmin: isAdmin,
        handleSignIn: handleSignIn,
        handleSignUp: handleSignUp,
        handleSignOut: handleSignOut,
        resetPassword: resetPassword,
        updateEmail: updateEmail,
        updatePassword: updatePassword,
    }); }, [currentUser]);
    return (react_1.default.createElement(AuthContext.Provider, { value: value }, !loading && children));
}
exports.AuthProvider = AuthProvider;