"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextId = exports.updateDatabase = exports.getDatabase = void 0;
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../config");
const types_1 = require("../types");
const faker_1 = require("@faker-js/faker");
let db;
const generateId = () => {
    return Date.now() + Math.floor(Math.random() * 1000);
};
const initializeDatabase = () => {
    if (!fs_1.default.existsSync(config_1.DB_DIR)) {
        fs_1.default.mkdirSync(config_1.DB_DIR, { recursive: true });
    }
    if (!fs_1.default.existsSync(config_1.UPLOADS_DIR)) {
        fs_1.default.mkdirSync(config_1.UPLOADS_DIR, { recursive: true });
    }
    if (!fs_1.default.existsSync(config_1.DATA_FILE)) {
        console.log('data.json not found, creating with sample data...');
        db = generateSampleData();
        saveDatabase();
    }
    else {
        console.log('Loading data from data.json...');
        loadDatabase();
    }
};
const loadDatabase = () => {
    try {
        const data = fs_1.default.readFileSync(config_1.DATA_FILE, 'utf8');
        db = JSON.parse(data);
        // Ensure all arrays exist if they were empty in the loaded file
        db.User = db.User || [];
        db.Artist = db.Artist || [];
        db.Song = db.Song || [];
        db.Quote = db.Quote || [];
        db.Photo = db.Photo || [];
    }
    catch (error) {
        console.error('Error loading database:', error);
        // If loading fails, re-initialize with sample data to prevent errors
        db = generateSampleData();
        saveDatabase();
    }
};
const saveDatabase = () => {
    fs_1.default.writeFileSync(config_1.DATA_FILE, JSON.stringify(db, null, 2), 'utf8');
};
const generateSampleData = () => {
    const users = [
        { id: generateId(), name: 'User One', email: 'user@example.com', password: 'password', role: types_1.Role.USER, location: { lat: 52.2297, lng: 21.0122 } },
        { id: generateId(), name: 'Admin User', email: 'admin@example.com', password: 'password', role: types_1.Role.ADMIN, location: { lat: 52.2297, lng: 21.0122 } },
        { id: generateId(), name: 'Root User', email: 'root@example.com', password: 'password', role: types_1.Role.ROOT, location: { lat: 52.2297, lng: 21.0122 } },
    ];
    const artists = [];
    for (let i = 0; i < 10; i++) {
        artists.push({
            id: generateId(),
            name: faker_1.faker.person.fullName(),
            photo: faker_1.faker.image.avatar(),
            location: { lat: parseFloat(String(faker_1.faker.location.latitude())), lng: parseFloat(String(faker_1.faker.location.longitude())) },
        });
    }
    const songs = [];
    artists.forEach(artist => {
        for (let i = 0; i < 10; i++) {
            songs.push({
                id: generateId(),
                title: faker_1.faker.music.songName(),
                year: String(faker_1.faker.date.past().getFullYear()),
                artistId: artist.id,
                photo: faker_1.faker.image.urlLoremFlickr({ category: 'music' }),
            });
        }
    });
    const quotes = [];
    for (let i = 0; i < 100; i++) {
        quotes.push({
            id: generateId(),
            text: faker_1.faker.lorem.sentences(2),
            author: faker_1.faker.person.fullName(),
        });
    }
    const photos = []; // No initial photos, as they are uploaded
    return { User: users, Artist: artists, Song: songs, Quote: quotes, Photo: photos };
};
const getDatabase = () => {
    if (!db) {
        initializeDatabase();
    }
    return db;
};
exports.getDatabase = getDatabase;
const updateDatabase = (newData) => {
    db = { ...db, ...newData };
    saveDatabase();
};
exports.updateDatabase = updateDatabase;
const getNextId = () => {
    return generateId();
};
exports.getNextId = getNextId;
