"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDelay = void 0;
const config_1 = require("../config");
const addDelay = (req, res, next) => {
    setTimeout(next, config_1.RESPONSE_DELAY_MS);
};
exports.addDelay = addDelay;
