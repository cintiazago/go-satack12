"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = void 0;
function helloWorld(request, response) {
    return response.json({ message: 'Hello world!' });
}
exports.helloWorld = helloWorld;
