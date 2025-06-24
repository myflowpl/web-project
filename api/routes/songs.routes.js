"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../utils/db");
const types_1 = require("../types");
const delay_middleware_1 = require("../middleware/delay.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Endpoint: GET /api/songs
router.get('/songs', delay_middleware_1.addDelay, (0, validation_middleware_1.validate)(validation_middleware_1.songsRequestSchema), (req, res) => {
    const db = (0, db_1.getDatabase)();
    let songs = [...db.Song]; // Work on a copy
    const artists = [...db.Artist]; // Work on a copy
    const { pageIndex = 0, pageSize = 5, q, artistId } = req.query;
    let filteredSongs = songs;
    if (q) {
        const searchTerm = String(q).toLowerCase();
        filteredSongs = filteredSongs.filter(song => song.title.toLowerCase().includes(searchTerm));
    }
    if (artistId !== undefined && artistId !== null) {
        filteredSongs = filteredSongs.filter(song => song.artistId === Number(artistId));
    }
    // Embed artist data
    const songsWithArtist = filteredSongs.map(song => {
        const artist = artists.find(a => a.id === song.artistId);
        return { ...song, artist: artist ? { ...artist, password: undefined } : undefined }; // Exclude password from embedded artist
    });
    const start = Number(pageIndex) * Number(pageSize);
    const end = start + Number(pageSize);
    const paginatedSongs = songsWithArtist.slice(start, end);
    const response = {
        page: Number(pageIndex),
        pageSize: Number(pageSize),
        length: filteredSongs.length,
        data: paginatedSongs,
    };
    res.status(200).json(response);
});
// Endpoint: POST /api/songs
router.post('/songs', delay_middleware_1.addDelay, auth_middleware_1.verifyToken, (0, auth_middleware_1.authorizeRoles)([types_1.Role.USER, types_1.Role.ADMIN, types_1.Role.ROOT]), (0, validation_middleware_1.validate)(validation_middleware_1.songsCreateSchema), (req, res) => {
    const { title, year, artistId, photo } = req.body;
    const db = (0, db_1.getDatabase)();
    // Check if artistId exists
    const artistExists = db.Artist.some(artist => artist.id === artistId);
    if (!artistExists) {
        const errorResponse = {
            message: 'Artist with provided artistId does not exist.',
            statusCode: 400
        };
        return res.status(400).json(errorResponse);
    }
    const newSong = {
        id: (0, db_1.getNextId)(),
        title,
        year,
        artistId,
        photo,
    };
    db.Song.push(newSong);
    (0, db_1.updateDatabase)(db);
    const response = { song: newSong };
    res.status(201).json(response);
});
// Endpoint: PATCH /api/songs/:id
router.patch('/songs/:id', delay_middleware_1.addDelay, auth_middleware_1.verifyToken, (0, auth_middleware_1.authorizeRoles)([types_1.Role.USER, types_1.Role.ADMIN, types_1.Role.ROOT]), (0, validation_middleware_1.validate)(validation_middleware_1.songUpdateSchema), (req, res) => {
    const songId = Number(req.params.id);
    const updates = req.body;
    const db = (0, db_1.getDatabase)();
    const songIndex = db.Song.findIndex(s => s.id === songId);
    if (songIndex === -1) {
        const errorResponse = {
            message: 'Song not found',
            statusCode: 404
        };
        return res.status(404).json(errorResponse);
    }
    // Check if artistId exists if it's being updated
    if (updates.artistId !== undefined && !db.Artist.some(artist => artist.id === updates.artistId)) {
        const errorResponse = {
            message: 'Artist with provided artistId does not exist.',
            statusCode: 400
        };
        return res.status(400).json(errorResponse);
    }
    // Create a new object for updatedSong to ensure immutability with shallow copy
    const updatedSong = { ...db.Song[songIndex], ...updates };
    db.Song[songIndex] = updatedSong;
    (0, db_1.updateDatabase)(db);
    const response = { song: updatedSong };
    res.status(200).json(response);
});
exports.default = router;
