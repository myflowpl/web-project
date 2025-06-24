"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../utils/db");
const types_1 = require("../types");
const config_1 = require("../config");
const delay_middleware_1 = require("../middleware/delay.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Endpoint: POST /api/register
router.post('/register', delay_middleware_1.addDelay, (0, validation_middleware_1.validate)(validation_middleware_1.registerSchema), (req, res) => {
    const { name, email, password } = req.body;
    const db = (0, db_1.getDatabase)();
    if (db.User.some(user => user.email.toLowerCase() === email.toLowerCase())) {
        const errorResponse = {
            message: 'Email already exists',
            statusCode: 400
        };
        return res.status(400).json(errorResponse);
    }
    const newUser = {
        id: (0, db_1.getNextId)(),
        name,
        email,
        password, // Storing as plain text as requested
        role: types_1.Role.USER, // Default role
        location: { lat: 0, lng: 0 } // Default location
    };
    db.User.push(newUser);
    (0, db_1.updateDatabase)(db);
    // Sign JWT with id, email, and role
    const accessToken = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, config_1.JWT_SECRET, { expiresIn: '1h' });
    // Exclude password from the response
    const response = { accessToken, user: { ...newUser, password: undefined } };
    res.status(201).json(response);
});
// Endpoint: POST /api/login
router.post('/login', delay_middleware_1.addDelay, (0, validation_middleware_1.validate)(validation_middleware_1.loginSchema), (req, res) => {
    const { email, password } = req.body;
    const db = (0, db_1.getDatabase)();
    const user = db.User.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) {
        const errorResponse = {
            message: 'Invalid credentials',
            statusCode: 400
        };
        return res.status(400).json(errorResponse);
    }
    // Sign JWT with id, email, and role
    const accessToken = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, config_1.JWT_SECRET, { expiresIn: '1h' });
    // Exclude password from the response
    const response = { accessToken, user: { ...user, password: undefined } };
    res.status(200).json(response);
});
// Endpoint: GET /api/profile
router.get('/profile', delay_middleware_1.addDelay, auth_middleware_1.verifyToken, (req, res) => {
    // req.user is guaranteed to be set by verifyToken middleware if successful
    if (!req.user) {
        // This case should ideally not be reached if verifyToken works correctly
        const errorResponse = {
            message: 'User not authenticated',
            statusCode: 401
        };
        return res.status(401).json(errorResponse);
    }
    // Exclude password from the response
    const response = { user: { ...req.user, password: undefined } };
    res.status(200).json(response);
});
// Endpoint: PATCH /api/profile
router.patch('/profile', delay_middleware_1.addDelay, auth_middleware_1.verifyToken, (0, validation_middleware_1.validate)(validation_middleware_1.profileUpdateSchema), (req, res) => {
    if (!req.user) {
        const errorResponse = {
            message: 'User not authenticated',
            statusCode: 401
        };
        return res.status(401).json(errorResponse);
    }
    const updates = req.body;
    const db = (0, db_1.getDatabase)();
    const userIndex = db.User.findIndex(u => { var _a; return u.id === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id); });
    if (userIndex === -1) {
        const errorResponse = {
            message: 'User not found',
            statusCode: 404
        };
        return res.status(404).json(errorResponse);
    }
    // If email is updated, check for uniqueness against other users
    if (updates.email && updates.email.toLowerCase() !== db.User[userIndex].email.toLowerCase()) {
        if (db.User.some(u => u.email.toLowerCase() === updates.email.toLowerCase())) {
            const errorResponse = {
                message: 'Email already exists for another user.',
                statusCode: 400
            };
            return res.status(400).json(errorResponse);
        }
    }
    // Apply updates, ensuring password is only updated if provided and meets length requirement
    const updatedUser = { ...db.User[userIndex], ...updates };
    // Handle password update separately if it exists in updates and is valid length
    if (updates.password && updates.password.length >= 3) {
        updatedUser.password = updates.password;
    }
    else if (updates.password !== undefined && updates.password.length < 3) {
        const errorResponse = {
            message: 'Password must be at least 3 characters long.',
            statusCode: 400
        };
        return res.status(400).json(errorResponse);
    }
    db.User[userIndex] = updatedUser;
    (0, db_1.updateDatabase)(db);
    // Exclude password from the response
    const response = { user: { ...updatedUser, password: undefined } };
    res.status(200).json(response);
});
exports.default = router;
