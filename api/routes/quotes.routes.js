"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../utils/db");
const delay_middleware_1 = require("../middleware/delay.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = (0, express_1.Router)();
// Endpoint: GET /api/quotes
router.get('/quotes', delay_middleware_1.addDelay, (0, validation_middleware_1.validate)(validation_middleware_1.quotesRequestSchema), (req, res) => {
    const db = (0, db_1.getDatabase)();
    let quotes = [...db.Quote]; // Work on a copy
    const { pageIndex = 0, pageSize = 5, q } = req.query;
    // Specific validation for 'q' length for quotes endpoint as per requirements
    if (q && String(q).length > 5) {
        const errorResponse = {
            message: 'Query parameter "q" cannot be longer than 5 characters for quotes.',
            statusCode: 400
        };
        return res.status(400).json(errorResponse);
    }
    let filteredQuotes = quotes;
    if (q) {
        const searchTerm = String(q).toLowerCase();
        filteredQuotes = quotes.filter(quote => quote.text.toLowerCase().includes(searchTerm) ||
            quote.author.toLowerCase().includes(searchTerm));
    }
    const start = Number(pageIndex) * Number(pageSize);
    const end = start + Number(pageSize);
    const paginatedQuotes = filteredQuotes.slice(start, end);
    const response = {
        page: Number(pageIndex),
        pageSize: Number(pageSize),
        length: filteredQuotes.length,
        data: paginatedQuotes,
    };
    res.status(200).json(response);
});
exports.default = router;
