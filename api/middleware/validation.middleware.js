"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.songsRequestSchema = exports.artistsRequestSchema = exports.quotesRequestSchema = exports.songUpdateSchema = exports.songsCreateSchema = exports.artistsUpdateSchema = exports.artistsCreateSchema = exports.profileUpdateSchema = exports.loginSchema = exports.registerSchema = exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    const errors = [];
    // Combine body, query, and params for validation
    const data = { ...req.body, ...req.query, ...req.params };
    // Specific validation rules based on schema flags
    if (schema.email && data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Invalid email format.');
    }
    if (schema.password && data.password && data.password.length < 3) {
        errors.push('Password must be at least 3 characters long.');
    }
    if (schema.name && data.name && typeof data.name !== 'string') {
        errors.push('Name must be a string.');
    }
    if (schema.artistId && data.artistId !== undefined && isNaN(Number(data.artistId))) {
        errors.push('Artist ID must be a number.');
    }
    // Special rule for quotes q parameter
    if (schema.q && typeof data.q === 'string' && data.q.length > 5 && req.baseUrl === '/api' && req.path === '/quotes') {
        errors.push('Query parameter "q" for quotes must not be longer than 5 characters.');
    }
    if (schema.pageIndex && data.pageIndex !== undefined && isNaN(Number(data.pageIndex))) {
        errors.push('PageIndex must be a number.');
    }
    if (schema.pageSize && data.pageSize !== undefined && isNaN(Number(data.pageSize))) {
        errors.push('PageSize must be a number.');
    }
    // Basic required field checks for POST requests
    if (req.method === 'POST' && schema.required && Array.isArray(schema.required)) {
        schema.required.forEach((field) => {
            // Check if the field is present and not an empty string (for strings)
            if (data[field] === undefined || data[field] === null || (typeof data[field] === 'string' && data[field].trim() === '')) {
                errors.push(`${field} is required.`);
            }
        });
    }
    if (errors.length > 0) {
        const errorResponse = {
            message: 'Validation error',
            statusCode: 400,
            errors: errors,
        };
        return res.status(400).json(errorResponse);
    }
    next();
};
exports.validate = validate;
// Define schemas for each DTO
exports.registerSchema = {
    email: true,
    password: true,
    name: true,
    required: ['name', 'email', 'password']
};
exports.loginSchema = {
    email: true,
    password: true,
    required: ['email', 'password']
};
exports.profileUpdateSchema = {
    email: true,
    password: true,
    name: true,
    location: true,
    photo: true
};
exports.artistsCreateSchema = {
    name: true,
    location: true,
    photo: true,
    required: ['name']
};
exports.artistsUpdateSchema = {
    name: true,
    location: true,
    photo: true
};
exports.songsCreateSchema = {
    title: true,
    year: true,
    artistId: true,
    photo: true,
    required: ['title', 'year', 'artistId']
};
exports.songUpdateSchema = {
    title: true,
    year: true,
    artistId: true,
    photo: true
};
exports.quotesRequestSchema = {
    q: true,
    pageIndex: true,
    pageSize: true
};
exports.artistsRequestSchema = {
    q: true,
    pageIndex: true,
    pageSize: true
};
exports.songsRequestSchema = {
    q: true,
    pageIndex: true,
    pageSize: true,
    artistId: true
};
