"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const db_1 = require("../utils/db");
const types_1 = require("../types");
const config_1 = require("../config");
const delay_middleware_1 = require("../middleware/delay.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Configure multer storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Ensure the uploads directory exists
        if (!fs_1.default.existsSync(config_1.UPLOADS_DIR)) {
            fs_1.default.mkdirSync(config_1.UPLOADS_DIR, { recursive: true });
        }
        cb(null, config_1.UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        // Generate a unique filename using a hash and original extension
        const ext = path_1.default.extname(file.originalname);
        const filename = `${crypto_1.default.randomBytes(16).toString('hex')}${ext}`;
        cb(null, filename);
    },
});
// Configure multer to accept only image files
const upload = (0, multer_1.default)({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB file size limit
    },
});
// Endpoint: POST /api/photos
router.post('/photos', delay_middleware_1.addDelay, auth_middleware_1.verifyToken, (0, auth_middleware_1.authorizeRoles)([types_1.Role.USER, types_1.Role.ADMIN, types_1.Role.ROOT]), (req, res, next) => {
    upload.single('photo')(req, res, (err) => {
        if (err instanceof multer_1.default.MulterError) {
            // A Multer error occurred when uploading.
            const errorResponse = {
                message: err.message,
                statusCode: 400
            };
            return res.status(400).json(errorResponse);
        }
        else if (err) {
            // An unknown error occurred.
            const errorResponse = {
                message: err.message,
                statusCode: 400
            };
            return res.status(400).json(errorResponse);
        }
        next(); // Continue to the route handler if no error
    });
}, (req, res) => {
    if (!req.file) {
        const errorResponse = {
            message: 'No photo uploaded',
            statusCode: 400
        };
        return res.status(400).json(errorResponse);
    }
    const db = (0, db_1.getDatabase)();
    const newPhoto = {
        id: (0, db_1.getNextId)(),
        filename: req.file.filename,
    };
    db.Photo.push(newPhoto);
    (0, db_1.updateDatabase)(db);
    const response = { photo: newPhoto };
    res.status(201).json(response);
});
exports.default = router;
