"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.UPLOADS_DIR = exports.DATA_FILE = exports.DB_DIR = exports.JWT_SECRET = exports.RESPONSE_DELAY_MS = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const env_1 = require("./utils/env");
// Initialize environment file if it doesn't exist
(0, env_1.initializeEnv)();
dotenv_1.default.config();
exports.RESPONSE_DELAY_MS = parseInt(process.env.RESPONSE_DELAY_MS || '500', 10);
exports.JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey'; // IMPORTANT: Change this in a real application
exports.DB_DIR = process.env.DB_DIR || 'db';
exports.DATA_FILE = path_1.default.join(exports.DB_DIR, 'data.json'); // Use path.join for cross-platform compatibility
exports.UPLOADS_DIR = path_1.default.join(exports.DB_DIR, 'uploads'); // Use path.join for cross-platform compatibility
exports.PORT = parseInt(process.env.PORT || '3000', 10);
