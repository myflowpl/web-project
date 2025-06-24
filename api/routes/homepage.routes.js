"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Root route - provide API information
router.get('/', (req, res) => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@myflowpl/api-server</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background: #f8f9fa;
            color: #333;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
        }
        h1 {
            color: #1a73e8;
            margin-bottom: 10px;
            font-size: 2.5em;
            font-weight: 300;
        }
        .version {
            color: #666;
            font-size: 0.9em;
            margin-bottom: 20px;
        }
        .description {
            font-size: 1.1em;
            color: #555;
            margin-bottom: 30px;
        }
        .section {
            margin-bottom: 30px;
        }
        .section h2 {
            color: #333;
            border-bottom: 2px solid #e8eaed;
            padding-bottom: 8px;
            margin-bottom: 15px;
        }
        .endpoint-group {
            margin-bottom: 20px;
        }
        .endpoint-group h3 {
            color: #1a73e8;
            margin-bottom: 10px;
            font-size: 1.1em;
        }
        .endpoints {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .endpoint {
            background: #f1f3f4;
            padding: 8px 12px;
            border-radius: 6px;
            text-decoration: none;
            color: #333;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.9em;
            transition: all 0.2s ease;
        }
        .endpoint:hover {
            background: #e8f0fe;
            color: #1a73e8;
            transform: translateY(-1px);
        }
        .endpoint.post { background: #e8f5e8; }
        .endpoint.patch { background: #fff3e0; }
        .endpoint.get { background: #e3f2fd; }
        .endpoint.post:hover { background: #c8e6c9; color: #2e7d32; }
        .endpoint.patch:hover { background: #ffe0b2; color: #f57c00; }
        .endpoint.get:hover { background: #bbdefb; color: #1976d2; }
        .docs-link, .json-link {
            display: inline-block;
            background: #1a73e8;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            transition: background 0.2s ease;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .docs-link:hover, .json-link:hover {
            background: #1557b0;
        }
        .json-link {
            background: #34a853;
        }
        .json-link:hover {
            background: #2d8f40;
        }
        .method {
            font-weight: bold;
            margin-right: 8px;
        }
        .method.get { color: #1976d2; }
        .method.post { color: #2e7d32; }
        .method.patch { color: #f57c00; }
        .docs-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>@myflowpl/api-server</h1>
        <div class="version">Version 1.0.0</div>
        <p class="description">A mock REST backend for frontend development training, simulating various API endpoints with authentication, CRUD operations, and file uploads.</p>
        
        <div class="section">
            <h2>📚 Documentation</h2>
            <p>Explore the complete API documentation with interactive testing or download the OpenAPI specification:</p>
            <div class="docs-buttons">
                <a href="/docs" class="docs-link">📖 View Swagger Documentation</a>
                <a href="/docs-json" class="json-link">📄 Download OpenAPI JSON</a>
            </div>
        </div>

        <div class="section">
            <h2>🔗 API Endpoints</h2>
            
            <div class="endpoint-group">
                <h3>🔐 Authentication</h3>
                <div class="endpoints">
                    <a href="/api/register" class="endpoint post"><span class="method post">POST</span>/api/register</a>
                    <a href="/api/login" class="endpoint post"><span class="method post">POST</span>/api/login</a>
                    <a href="/api/profile" class="endpoint get"><span class="method get">GET</span>/api/profile</a>
                    <a href="/api/profile" class="endpoint patch"><span class="method patch">PATCH</span>/api/profile</a>
                </div>
            </div>

            <div class="endpoint-group">
                <h3>💭 Quotes</h3>
                <div class="endpoints">
                    <a href="/api/quotes" class="endpoint get"><span class="method get">GET</span>/api/quotes</a>
                    <a href="/api/quotes?pageSize=3" class="endpoint get"><span class="method get">GET</span>/api/quotes?pageSize=3</a>
                    <a href="/api/quotes?q=great" class="endpoint get"><span class="method get">GET</span>/api/quotes?q=great</a>
                </div>
            </div>

            <div class="endpoint-group">
                <h3>🎵 Artists</h3>
                <div class="endpoints">
                    <a href="/api/artists" class="endpoint get"><span class="method get">GET</span>/api/artists</a>
                    <a href="/api/artists?pageSize=3" class="endpoint get"><span class="method get">GET</span>/api/artists?pageSize=3</a>
                    <a href="/api/artists" class="endpoint post"><span class="method post">POST</span>/api/artists</a>
                    <a href="/api/artists/{id}" class="endpoint patch"><span class="method patch">PATCH</span>/api/artists/{id}</a>
                </div>
            </div>

            <div class="endpoint-group">
                <h3>🎶 Songs</h3>
                <div class="endpoints">
                    <a href="/api/songs" class="endpoint get"><span class="method get">GET</span>/api/songs</a>
                    <a href="/api/songs?pageSize=3" class="endpoint get"><span class="method get">GET</span>/api/songs?pageSize=3</a>
                    <a href="/api/songs" class="endpoint post"><span class="method post">POST</span>/api/songs</a>
                    <a href="/api/songs/{id}" class="endpoint patch"><span class="method patch">PATCH</span>/api/songs/{id}</a>
                </div>
            </div>

            <div class="endpoint-group">
                <h3>📷 Photos</h3>
                <div class="endpoints">
                    <a href="/api/photos" class="endpoint post"><span class="method post">POST</span>/api/photos</a>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>🔧 Developer Resources</h2>
            <div class="endpoint-group">
                <h3>📋 OpenAPI Specification</h3>
                <div class="endpoints">
                    <a href="/docs-json" class="endpoint get"><span class="method get">GET</span>/docs-json</a>
                </div>
                <p style="margin-top: 10px; color: #666; font-size: 0.9em;">
                    Download the complete OpenAPI 3.0 specification in JSON format for use with code generators, testing tools, or external documentation systems.
                </p>
            </div>
        </div>

        <div class="section">
            <h2>ℹ️ Quick Start</h2>
            <p>1. <strong>Browse data:</strong> Click on any GET endpoint above to see sample data</p>
            <p>2. <strong>Authentication:</strong> Use the Swagger docs to register/login and get JWT tokens</p>
            <p>3. <strong>Test API:</strong> Use the interactive Swagger UI for complete API testing</p>
            <p>4. <strong>Sample users:</strong> user@example.com, admin@example.com, root@example.com (password: "password")</p>
            <p>5. <strong>External tools:</strong> Import the OpenAPI JSON into Postman, Insomnia, or other API clients</p>
        </div>
    </div>
</body>
</html>`;
    res.send(html);
});
exports.default = router;
