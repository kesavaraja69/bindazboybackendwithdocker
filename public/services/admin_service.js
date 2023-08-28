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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminfs = void 0;
const admin = __importStar(require("firebase-admin"));
const dotenv = __importStar(require("dotenv"));
const service_account_json_1 = __importDefault(require("../service-account.json"));
dotenv.config();
const adminfs = admin;
exports.adminfs = adminfs;
let params = {
    //clone json object into new object to make typescript happy
    type: service_account_json_1.default.type,
    projectId: process.env.project_id,
    privateKeyId: process.env.private_key_id,
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCl8Vz/GaXjLLeb\niaAdzPSD0NpCOkaTJVW4Nb3G7qDgsiVgNjkwE1DdVzDHX/VQoNaAhFKzC6s+H6QI\nTvXoN4M7ZL4jZNU5vWyVyz0+w24VdCVfQ7OX2hgmL3gz5fKLMrPBp/TyAekbjHaP\n1L+hKy2c12gjCXVcJsvqpKpwAmOMubqEm/tMUuNHMJZS6WbKGSsHLG/GaFGNeyk6\n/xUgCqL1hDKeIr4Scy86LX6WffxM/7LXsiIRLcSavCCwev0pEd4mpbdIJyZOAyy0\nWGWLS3bMHQfjeGoV2IToUiXVPGZ21OoV5Qgd6sErrPYAh6gG2/PwSw1eVoTfY6KO\n0YejQVThAgMBAAECggEABA7ozhFPwgRGMj7VpFzujum06ME5mCAl3kUsMLkFxLD+\nooF4+RDD3cHj3sBdRL1GOarixd+vbqvB7HUX5Pe0lSeD0eRFpa2ZAfnQM+B+KPan\n8lI6ymgqRobLKwPA4IAbLs1/e0qqK4MOJDrY++VNLoSDFrZEwT3upzyjMW2Rhy+6\ndo0CPfFL5hMMy69/M9W1z+xUFDHx1jMNkNB7BOmAg4gd/13JD1M9IBdIL2c8daSz\nUGvpWPd1+7hoHBEOD0c41jUy+W18cbNxNDkdMyG5TzREDZ0XnniFlqPoz1VFqxk1\n1vyaxGpYmk+SfbGBx69jyzBgKAbk5segA7gbNVoyZQKBgQDnetbJWKJYz80tgafF\njK60hRnnqeUVJjc7FKe9QeRNqd7suO06cUuixhXcnJFZj4xpQwMK8KzY+Bx1q2FI\nHAcsV0LUmaun6ZQ/mv1a80NG/RgkOGzH8dy3t8EH2XmXRswxYoddiWXhMk/1YT+S\nQY6QuFPDUSzLRwTGgeUUZCWWxQKBgQC3hVKLmwksh0oIqjyTkgEj8tslhF7QPwg6\n/7hc9MmVnpogpFrxEFDOP2XQbUI7BICr1RjdkL3IqpZuXlIcLi4D9ctljmx//+d+\ngK/oac28lAdItrjbwF9NEGHtG9AQ+aq7n8S6gnOzldOM5gpQwjNQ1m0w/XY+stc+\n3ZXuM6nHbQKBgFyUGYEvrMZ+XZ4co9/zkw/px+GKZm+d+Crt6ORdjRSuotTkZSSh\nmVGBjc7M46kBK3QR9A6VEVw5ZxB8uYyggRHv2G+1Ah1G4x7JOxj7/+VNZjFeS8tv\n5QmpOU+NX/7rttDtihwTzqZRe/80pLs28vDYd8+/EH5Aah2GZ/tOzmXNAoGAPYy9\nbo0EuqZ1MgrGXkftkfz1etO2aOl6/S6eyq5enYuf7aqxxX/PWhzxLMI4IEsWTIsf\n18+flxl/cmy35TOnwzRAj0MBKLzPCyJl3PD/S2vqNXzy6uDOFa6U6U0Wr1rM5Dhl\nZpgx7d0mIm9UrlkzlL0VygR4D/czMaZnjohNPNECgYAl3a/UYgwTsKyCH7aOL1nj\nZFNHMmBiRpAAps+LOn21WA/65ZXk3yn82NhptVZt9tOmaA7kt5ih4jjBqfrGVheu\nGCHG88dMbmJfCk6VYlSv+n7UjaG+XqitZhlCUnYu+Cjt1d83/oVkLBnRQi28wMsS\nWpkEZcqKTM8i4GQOcjwhOQ==\n-----END PRIVATE KEY-----\n",
    clientEmail: process.env.client_email,
    clientId: process.env.client_id,
    authUri: service_account_json_1.default.auth_uri,
    tokenUri: service_account_json_1.default.token_uri,
    authProviderX509CertUrl: service_account_json_1.default.auth_provider_x509_cert_url,
    clientC509CertUrl: process.env.client_x509_cert_url,
};
adminfs.initializeApp({
    credential: adminfs.credential.cert(params),
});
