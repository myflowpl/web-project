"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors")); // For local dev, allow all origins
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const db_1 = require("./utils/db"); // This will initialize DB if not exists
const swagger_1 = require("./utils/swagger");
// Import routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const artists_routes_1 = __importDefault(require("./routes/artists.routes"));
const songs_routes_1 = __importDefault(require("./routes/songs.routes"));
const quotes_routes_1 = __importDefault(require("./routes/quotes.routes"));
const photos_routes_1 = __importDefault(require("./routes/photos.routes"));
const homepage_routes_1 = __importDefault(require("./routes/homepage.routes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)()); // Allow all CORS for development
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Serve static uploaded files from the db/uploads directory
// process.cwd() ensures the path is relative to where the command is run
app.use('/uploads', express_1.default.static(path_1.default.join(process.cwd(), config_1.UPLOADS_DIR)));
// Initialize database (create db directory and data.json if not exist)
// This must be called before routes that access the database
(0, db_1.getDatabase)();
// Setup Swagger UI at the /docs path and /docs-json endpoint
// This will make http://localhost:3000/docs show the Swagger documentation
// and http://localhost:3000/docs-json provide the raw OpenAPI specification
(0, swagger_1.setupSwagger)(app);
// Homepage routes
app.use('/', homepage_routes_1.default);
// API routes - all prefixed with /api
app.use('/api', auth_routes_1.default);
app.use('/api', artists_routes_1.default);
app.use('/api', songs_routes_1.default);
app.use('/api', quotes_routes_1.default);
app.use('/api', photos_routes_1.default);
// Global error handler
// This catches errors from middlewares and route handlers
app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err.stack); // Log the full error stack for debugging
    const statusCode = err.statusCode || 500; // Use status code from error if available, else 500
    const message = err.message || 'Something went wrong!'; // Use error message if available
    const errorResponse = {
        message: message,
        statusCode: statusCode,
        errors: err.errors // Include validation errors if present
    };
    res.status(statusCode).json(errorResponse);
});
// Start the server
app.listen(config_1.PORT, () => {
    console.log(`Mock API Server running on http://localhost:${config_1.PORT}`);
    console.log(`Homepage available at http://localhost:${config_1.PORT}`);
    console.log(`Swagger UI available at http://localhost:${config_1.PORT}/docs`);
    console.log(`OpenAPI JSON available at http://localhost:${config_1.PORT}/docs-json`);
    console.log(`API endpoints prefixed with /api, e.g., http://localhost:${config_1.PORT}/api/register`);
    console.log(`Data stored in ${path_1.default.join(process.cwd(), config_1.DATA_FILE)}`);
    console.log(`Uploaded photos stored in ${path_1.default.join(process.cwd(), config_1.UPLOADS_DIR)}`);
});
