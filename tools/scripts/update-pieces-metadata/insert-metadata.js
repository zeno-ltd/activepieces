"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMetadata = void 0;
var node_assert_1 = require("node:assert");
var http_status_codes_1 = require("http-status-codes");
var src_1 = require("../../../packages/pieces/common/src");
(0, node_assert_1.default)(process.env['AP_CLOUD_API_KEY'], 'API Key is not defined');
var AP_CLOUD_API_KEY = process.env.AP_CLOUD_API_KEY;
var AP_CLOUD_API_BASE = 'https://cloud.activepieces.com/api/v1';
var insertPieceMetadata = function (pieceMetadata) { return __awaiter(void 0, void 0, void 0, function () {
    var body, headers, cloudResponse, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                body = JSON.stringify(pieceMetadata);
                headers = (_b = {},
                    _b[src_1.HttpHeader.API_KEY] = AP_CLOUD_API_KEY,
                    _b[src_1.HttpHeader.CONTENT_TYPE] = 'application/json',
                    _b);
                return [4 /*yield*/, fetch("".concat(AP_CLOUD_API_BASE, "/admin/pieces"), {
                        method: 'POST',
                        headers: headers,
                        body: body
                    })];
            case 1:
                cloudResponse = _c.sent();
                if (!(cloudResponse.status !== http_status_codes_1.StatusCodes.OK)) return [3 /*break*/, 3];
                _a = Error.bind;
                return [4 /*yield*/, cloudResponse.text()];
            case 2: throw new (_a.apply(Error, [void 0, _c.sent()]))();
            case 3: return [2 /*return*/];
        }
    });
}); };
var pieceMetadataExists = function (pieceName, pieceVersion) { return __awaiter(void 0, void 0, void 0, function () {
    var cloudResponse, pieceExist, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, fetch("".concat(AP_CLOUD_API_BASE, "/pieces/").concat(pieceName, "?version=").concat(pieceVersion))];
            case 1:
                cloudResponse = _c.sent();
                pieceExist = (_b = {},
                    _b[http_status_codes_1.StatusCodes.OK] = true,
                    _b[http_status_codes_1.StatusCodes.NOT_FOUND] = false,
                    _b);
                if (!(pieceExist[cloudResponse.status] === null ||
                    pieceExist[cloudResponse.status] === undefined)) return [3 /*break*/, 3];
                _a = Error.bind;
                return [4 /*yield*/, cloudResponse.text()];
            case 2: throw new (_a.apply(Error, [void 0, _c.sent()]))();
            case 3: return [2 /*return*/, pieceExist[cloudResponse.status]];
        }
    });
}); };
var insertMetadataIfNotExist = function (pieceMetadata) { return __awaiter(void 0, void 0, void 0, function () {
    var metadataAlreadyExist;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.info("insertMetadataIfNotExist, name: ".concat(pieceMetadata.name, ", version: ").concat(pieceMetadata.version));
                return [4 /*yield*/, pieceMetadataExists(pieceMetadata.name, pieceMetadata.version)];
            case 1:
                metadataAlreadyExist = _a.sent();
                if (metadataAlreadyExist) {
                    console.info("insertMetadataIfNotExist, piece metadata already inserted");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, insertPieceMetadata(pieceMetadata)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var insertMetadata = function (piecesMetadata) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, piecesMetadata_1, pieceMetadata;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, piecesMetadata_1 = piecesMetadata;
                _a.label = 1;
            case 1:
                if (!(_i < piecesMetadata_1.length)) return [3 /*break*/, 4];
                pieceMetadata = piecesMetadata_1[_i];
                return [4 /*yield*/, insertMetadataIfNotExist(pieceMetadata)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.insertMetadata = insertMetadata;
