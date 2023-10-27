"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMetadata = void 0;
var semver = require("semver");
var validateSupportedRelease = function (minRelease, maxRelease) {
    if (minRelease !== undefined && !semver.valid(minRelease)) {
        throw Error("[validateSupportedRelease] \"minimumSupportedRelease\" should be a valid semver version");
    }
    if (maxRelease !== undefined && !semver.valid(maxRelease)) {
        throw Error("[validateSupportedRelease] \"maximumSupportedRelease\" should be a valid semver version");
    }
    if (minRelease !== undefined && maxRelease !== undefined && semver.gt(minRelease, maxRelease)) {
        throw Error("[validateSupportedRelease] \"minimumSupportedRelease\" should be less than \"maximumSupportedRelease\"");
    }
};
var validateMetadata = function (pieceMetadata) {
    console.info("[validateMetadata] pieceName=".concat(pieceMetadata.name));
    validateSupportedRelease(pieceMetadata.minimumSupportedRelease, pieceMetadata.maximumSupportedRelease);
};
exports.validateMetadata = validateMetadata;
