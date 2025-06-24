"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const config_1 = require("../config");
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: '@myflowpl/api-server',
            version: '1.0.0',
            description: 'A mock REST backend for frontend development training, simulating various API endpoints.',
        },
        servers: [
            {
                url: `http://localhost:${config_1.PORT}/api`,
                description: 'Local API Server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT Bearer token in the format: Bearer <token>'
                },
            },
            schemas: {
                // Shared DTOs and Models
                Role: {
                    type: 'string',
                    enum: ['user', 'admin', 'root'],
                    example: 'user'
                },
                Location: {
                    type: 'object',
                    properties: {
                        lat: { type: 'number', format: 'float', example: 52.2297 },
                        lng: { type: 'number', format: 'float', example: 21.0122 },
                    },
                    required: ['lat', 'lng'],
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', format: 'int64', example: 1700000000001 },
                        name: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
                        photo: { type: 'string', example: 'https://example.com/photo.jpg' },
                        role: { $ref: '#/components/schemas/Role' },
                        location: { $ref: '#/components/schemas/Location' },
                    },
                },
                Quote: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', format: 'int64', example: 1700000000002 },
                        text: { type: 'string', example: 'The only way to do great work is to love what you do.' },
                        author: { type: 'string', example: 'Steve Jobs' },
                    },
                    required: ['id', 'text', 'author'],
                },
                Artist: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', format: 'int64', example: 1700000000003 },
                        name: { type: 'string', example: 'The Beatles' },
                        photo: { type: 'string', example: 'https://example.com/beatles.jpg' },
                        location: { $ref: '#/components/schemas/Location' },
                    },
                    required: ['id', 'name'],
                },
                Song: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', format: 'int64', example: 1700000000004 },
                        title: { type: 'string', example: 'Hey Jude' },
                        year: { type: 'string', example: '1968' },
                        artistId: { type: 'integer', format: 'int64', example: 1700000000003 },
                        photo: { type: 'string', example: 'https://example.com/heyy_jude.jpg' },
                        artist: { $ref: '#/components/schemas/Artist' },
                    },
                    required: ['id', 'title', 'year', 'artistId'],
                },
                Photo: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', format: 'int64', example: 1700000000005 },
                        filename: { type: 'string', example: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.png' },
                    },
                    required: ['id', 'filename'],
                },
                // Request DTOs
                RegisterRequestDto: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'Test User' },
                        email: { type: 'string', format: 'email', example: 'test@example.com' },
                        password: { type: 'string', minLength: 3, example: 'password123' },
                    },
                    required: ['name', 'email', 'password'],
                },
                LoginRequestDto: {
                    type: 'object',
                    properties: {
                        email: { type: 'string', format: 'email', example: 'user@example.com' },
                        password: { type: 'string', minLength: 3, example: 'password' },
                    },
                    required: ['email', 'password'],
                },
                ProfileUpdateRequestDto: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'Updated Name' },
                        email: { type: 'string', format: 'email', example: 'updated@example.com' },
                        photo: { type: 'string', example: 'https://example.com/new-photo.jpg' },
                        password: { type: 'string', minLength: 3, example: 'newpass' },
                        location: { $ref: '#/components/schemas/Location' },
                    },
                },
                ArtistsCreateRequestDto: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'New Artist' },
                        photo: { type: 'string', example: 'https://example.com/new-artist.jpg' },
                        location: { $ref: '#/components/schemas/Location' },
                    },
                    required: ['name'],
                },
                ArtistsUpdateRequestDto: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'Updated Artist Name' },
                        photo: { type: 'string', example: 'https://example.com/updated-artist.jpg' },
                        location: { $ref: '#/components/schemas/Location' },
                    },
                },
                SongsCreateRequestDto: {
                    type: 'object',
                    properties: {
                        title: { type: 'string', example: 'New Song Title' },
                        year: { type: 'string', example: '2023' },
                        artistId: { type: 'integer', format: 'int64', example: 1700000000003 },
                        photo: { type: 'string', example: 'https://example.com/new-song.jpg' },
                    },
                    required: ['title', 'year', 'artistId'],
                },
                SongUpdateRequestDto: {
                    type: 'object',
                    properties: {
                        title: { type: 'string', example: 'Updated Song Title' },
                        year: { type: 'string', example: '2024' },
                        artistId: { type: 'integer', format: 'int64', example: 1700000000003 },
                        photo: { type: 'string', example: 'https://example.com/updated-song.jpg' },
                    },
                },
                // Response DTOs
                RegisterResponseDto: {
                    type: 'object',
                    properties: {
                        accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                        user: { $ref: '#/components/schemas/User' },
                    },
                    required: ['accessToken', 'user'],
                },
                LoginResponseDto: {
                    type: 'object',
                    properties: {
                        accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                        user: { $ref: '#/components/schemas/User' },
                    },
                    required: ['accessToken', 'user'],
                },
                ProfileResponseDto: {
                    type: 'object',
                    properties: {
                        user: { $ref: '#/components/schemas/User' },
                    },
                    required: ['user'],
                },
                ProfileUpdateResponseDto: {
                    type: 'object',
                    properties: {
                        user: { $ref: '#/components/schemas/User' },
                    },
                    required: ['user'],
                },
                PhotoCreateResponseDto: {
                    type: 'object',
                    properties: {
                        photo: { $ref: '#/components/schemas/Photo' },
                    },
                    required: ['photo'],
                },
                ArtistsCreateResponseDto: {
                    type: 'object',
                    properties: {
                        artist: { $ref: '#/components/schemas/Artist' },
                    },
                    required: ['artist'],
                },
                ArtistsUpdateResponseDto: {
                    type: 'object',
                    properties: {
                        artist: { $ref: '#/components/schemas/Artist' },
                    },
                    required: ['artist'],
                },
                SongsCreateResponseDto: {
                    type: 'object',
                    properties: {
                        song: { $ref: '#/components/schemas/Song' },
                    },
                    required: ['song'],
                },
                SongUpdateResponseDto: {
                    type: 'object',
                    properties: {
                        song: { $ref: '#/components/schemas/Song' },
                    },
                    required: ['song'],
                },
                // Pagination Response Objects
                QuotesResponseDto: {
                    type: 'object',
                    properties: {
                        page: { type: 'integer', example: 0 },
                        pageSize: { type: 'integer', example: 5 },
                        length: { type: 'integer', example: 100 },
                        data: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Quote' },
                        },
                    },
                    required: ['page', 'pageSize', 'length', 'data'],
                },
                ArtistsResponseDto: {
                    type: 'object',
                    properties: {
                        page: { type: 'integer', example: 0 },
                        pageSize: { type: 'integer', example: 5 },
                        length: { type: 'integer', example: 10 },
                        data: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Artist' },
                        },
                    },
                    required: ['page', 'pageSize', 'length', 'data'],
                },
                SongsResponseDto: {
                    type: 'object',
                    properties: {
                        page: { type: 'integer', example: 0 },
                        pageSize: { type: 'integer', example: 5 },
                        length: { type: 'integer', example: 100 },
                        data: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Song' },
                        },
                    },
                    required: ['page', 'pageSize', 'length', 'data'],
                },
                // Error Response
                ApiResponseError: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Validation error' },
                        statusCode: { type: 'integer', example: 400 },
                        errors: {
                            type: 'array',
                            items: { type: 'string', example: 'Email is required.' },
                            description: 'List of validation errors (optional)',
                        },
                    },
                    required: ['message', 'statusCode'],
                },
            },
        },
        paths: {
            '/register': {
                post: {
                    summary: 'Register a new user',
                    tags: ['Authentication'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/RegisterRequestDto' },
                            },
                        },
                    },
                    responses: {
                        '201': {
                            description: 'User registered successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/RegisterResponseDto' },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid input or email already exists',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                    },
                },
            },
            '/login': {
                post: {
                    summary: 'Login user',
                    tags: ['Authentication'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/LoginRequestDto' },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'User logged in successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/LoginResponseDto' },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid credentials',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                    },
                },
            },
            '/profile': {
                get: {
                    summary: 'Get current user profile',
                    tags: ['Authentication'],
                    security: [{ bearerAuth: [] }],
                    responses: {
                        '200': {
                            description: 'User profile retrieved successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ProfileResponseDto' },
                                },
                            },
                        },
                        '401': {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                    },
                },
                patch: {
                    summary: 'Update current user profile',
                    tags: ['Authentication'],
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ProfileUpdateRequestDto' },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'User profile updated successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ProfileUpdateResponseDto' },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid input or email already exists',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                        '401': {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                    },
                },
            },
            '/quotes': {
                get: {
                    summary: 'Get a list of quotes with pagination and search',
                    tags: ['Quotes'],
                    parameters: [
                        {
                            name: 'pageIndex',
                            in: 'query',
                            schema: { type: 'integer', default: 0 },
                            description: 'Page number (0-indexed)',
                        },
                        {
                            name: 'pageSize',
                            in: 'query',
                            schema: { type: 'integer', default: 5 },
                            description: 'Number of items per page',
                        },
                        {
                            name: 'q',
                            in: 'query',
                            schema: { type: 'string' },
                            description: 'Search query for text or author',
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'List of quotes',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/QuotesResponseDto' },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid query parameters',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                    },
                },
            },
            '/artists': {
                get: {
                    summary: 'Get a list of artists with pagination and search',
                    tags: ['Artists'],
                    parameters: [
                        {
                            name: 'pageIndex',
                            in: 'query',
                            schema: { type: 'integer', default: 0 },
                            description: 'Page number (0-indexed)',
                        },
                        {
                            name: 'pageSize',
                            in: 'query',
                            schema: { type: 'integer', default: 5 },
                            description: 'Number of items per page',
                        },
                        {
                            name: 'q',
                            in: 'query',
                            schema: { type: 'string' },
                            description: 'Search query for artist name',
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'List of artists',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ArtistsResponseDto' },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid query parameters',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                    },
                },
                post: {
                    summary: 'Create a new artist',
                    tags: ['Artists'],
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ArtistsCreateRequestDto' },
                            },
                        },
                    },
                    responses: {
                        '201': {
                            description: 'Artist created successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ArtistsCreateResponseDto' },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid input',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                        '401': {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                    },
                },
            },
            '/artists/{id}': {
                patch: {
                    summary: 'Update an existing artist',
                    tags: ['Artists'],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: { type: 'integer', format: 'int64' },
                            description: 'ID of the artist to update',
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ArtistsUpdateRequestDto' },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Artist updated successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ArtistsUpdateResponseDto' },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid input',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                        '401': {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                        '404': {
                            description: 'Artist not found',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                    },
                },
            },
            '/songs': {
                get: {
                    summary: 'Get a list of songs with pagination, search, and artist filter',
                    tags: ['Songs'],
                    parameters: [
                        {
                            name: 'pageIndex',
                            in: 'query',
                            schema: { type: 'integer', default: 0 },
                            description: 'Page number (0-indexed)',
                        },
                        {
                            name: 'pageSize',
                            in: 'query',
                            schema: { type: 'integer', default: 5 },
                            description: 'Number of items per page',
                        },
                        {
                            name: 'q',
                            in: 'query',
                            schema: { type: 'string' },
                            description: 'Search query for song title',
                        },
                        {
                            name: 'artistId',
                            in: 'query',
                            schema: { type: 'integer', format: 'int64' },
                            description: 'Filter songs by artist ID',
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'List of songs',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/SongsResponseDto' },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid query parameters',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                    },
                },
                post: {
                    summary: 'Create a new song',
                    tags: ['Songs'],
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/SongsCreateRequestDto' },
                            },
                        },
                    },
                    responses: {
                        '201': {
                            description: 'Song created successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/SongsCreateResponseDto' },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid input or artistId not found',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                        '401': {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                    },
                },
            },
            '/songs/{id}': {
                patch: {
                    summary: 'Update an existing song',
                    tags: ['Songs'],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: { type: 'integer', format: 'int64' },
                            description: 'ID of the song to update',
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/SongUpdateRequestDto' },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Song updated successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/SongUpdateResponseDto' },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid input or artistId not found',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                        '401': {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                        '404': {
                            description: 'Song not found',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                    },
                },
            },
            '/photos': {
                post: {
                    summary: 'Upload a photo',
                    tags: ['Photos'],
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'multipart/form-data': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        photo: {
                                            type: 'string',
                                            format: 'binary',
                                            description: 'The image file to upload (JPEG, PNG, GIF). Max 5MB.',
                                        },
                                    },
                                    required: ['photo']
                                },
                            },
                        },
                    },
                    responses: {
                        '201': {
                            description: 'Photo uploaded successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/PhotoCreateResponseDto' },
                                },
                            },
                        },
                        '400': {
                            description: 'No photo uploaded or invalid file type/size',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                        '401': {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ApiResponseError' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    // We specify paths directly in swaggerDefinition, so no need to scan files
    apis: [],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.swaggerSpec = swaggerSpec;
const setupSwagger = (app) => {
    // Serve Swagger UI at the /docs path
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, {
        explorer: true, // Enable search bar in Swagger UI
        swaggerOptions: {
            // Persist authorization in localStorage
            persistAuthorization: true,
            // Display request duration
            displayRequestDuration: true,
            // Try it out by default
            tryItOutEnabled: true,
            // Filter by tags
            filter: true,
            // Show extensions
            showExtensions: true,
            // Show common extensions
            showCommonExtensions: true,
            // Max displayed tags
            maxDisplayedTags: -1,
            // Deep linking
            deepLinking: true,
            // Display operation id
            displayOperationId: false,
            // Default models expansion depth
            defaultModelsExpandDepth: 1,
            // Default model expansion depth
            defaultModelExpandDepth: 1,
            // Default model rendering
            defaultModelRendering: 'example',
            // Show request headers
            showRequestHeaders: true,
            // Show response headers  
            showResponseHeaders: true,
            // Enable CORS
            supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch', 'options', 'head'],
        },
        customSiteTitle: '@myflowpl/api-server - Documentation',
        customfavIcon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzFhNzNlOCIvPgo8cGF0aCBkPSJNOCAxMmg0djhoLTR2LTh6bTYgMGg0djhoLTR2LTh6bTYgMGg0djhoLTR2LTh6IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K'
    }));
    // Expose raw OpenAPI JSON specification for external tools
    app.get('/docs-json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.json(swaggerSpec);
    });
};
exports.setupSwagger = setupSwagger;
