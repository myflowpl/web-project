"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const db_1 = require("../utils/db");
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const errorResponse = {
            message: 'No token provided, authorization denied',
            statusCode: 401
        };
        return res.status(401).json(errorResponse);
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        const db = (0, db_1.getDatabase)();
        const user = db.User.find(u => u.id === decoded.id);
        if (!user) {
            const errorResponse = {
                message: 'User not found',
                statusCode: 401
            };
            return res.status(401).json(errorResponse);
        }
        // Remove password before attaching to request to avoid accidental exposure
        req.user = { ...user, password: undefined };
        next();
    }
    catch (err) {
        console.error('Token verification error:', err.message);
        const errorResponse = {
            message: 'Token is not valid',
            statusCode: 401
        };
        res.status(401).json(errorResponse);
    }
};
exports.verifyToken = verifyToken;
const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            const errorResponse = {
                message: 'Access denied: User not authenticated',
                statusCode: 403
            };
            return res.status(403).json(errorResponse);
        }
        if (!req.user.role || !roles.includes(req.user.role)) {
            const errorResponse = {
                message: `Access denied: Requires one of roles: ${roles.join(', ')}`,
                statusCode: 403
            };
            return res.status(403).json(errorResponse);
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
