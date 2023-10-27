"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessTokenOrThrow = void 0;
var getAccessTokenOrThrow = function (auth) {
    var accessToken = auth === null || auth === void 0 ? void 0 : auth.access_token;
    if (accessToken === undefined) {
        throw new Error("Invalid bearer token");
    }
    return accessToken;
};
exports.getAccessTokenOrThrow = getAccessTokenOrThrow;
