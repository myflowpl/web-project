"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../utils/db");
const types_1 = require("../types");
const delay_middleware_1 = require("../middleware/delay.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Endpoint: GET /api/artists
router.get('/artists', delay_middleware_1.addDelay, (0, validation_middleware_1.validate)(validation_middleware_1.artistsRequestSchema), (req, res) => {
    const db = (0, db_1.getDatabase)();
    let artists = [...db.Artist]; // Work on a copy
    const { pageIndex = 0, pageSize = 5, q } = req.query;
    let filteredArtists = artists;
    if (q) {
        const searchTerm = String(q).toLowerCase();
        filteredArtists = artists.filter(artist => artist.name.toLowerCase().includes(searchTerm));
    }
    const start = Number(pageIndex) * Number(pageSize);
    const end = start + Number(pageSize);
    const paginatedArtists = filteredArtists.slice(start, end);
    const response = {
        page: Number(pageIndex),
        pageSize: Number(pageSize),
        length: filteredArtists.length,
        data: paginatedArtists,
    };
    res.status(200).json(response);
});
// Endpoint: POST /api/artists
router.post('/artists', delay_middleware_1.addDelay, auth_middleware_1.verifyToken, (0, auth_middleware_1.authorizeRoles)([types_1.Role.USER, types_1.Role.ADMIN, types_1.Role.ROOT]), (0, validation_middleware_1.validate)(validation_middleware_1.artistsCreateSchema), (req, res) => {
    const { name, photo, location } = req.body;
    const db = (0, db_1.getDatabase)();
    const newArtist = {
        id: (0, db_1.getNextId)(),
        name,
        photo,
        location,
    };
    db.Artist.push(newArtist);
    (0, db_1.updateDatabase)(db);
    const response = { artist: newArtist };
    res.status(201).json(response);
});
// Endpoint: PATCH /api/artists/:id
router.patch('/artists/:id', delay_middleware_1.addDelay, auth_middleware_1.verifyToken, (0, auth_middleware_1.authorizeRoles)([types_1.Role.USER, types_1.Role.ADMIN, types_1.Role.ROOT]), (0, validation_middleware_1.validate)(validation_middleware_1.artistsUpdateSchema), (req, res) => {
    const artistId = Number(req.params.id);
    const updates = req.body;
    const db = (0, db_1.getDatabase)();
    const artistIndex = db.Artist.findIndex(a => a.id === artistId);
    if (artistIndex === -1) {
        const errorResponse = {
            message: 'Artist not found',
            statusCode: 404
        };
        return res.status(404).json(errorResponse);
    }
    // Create a new object for updatedArtist to ensure immutability with shallow copy
    const updatedArtist = { ...db.Artist[artistIndex], ...updates };
    db.Artist[artistIndex] = updatedArtist;
    (0, db_1.updateDatabase)(db);
    const response = { artist: updatedArtist };
    res.status(200).json(response);
});
exports.default = router;
