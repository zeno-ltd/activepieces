"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.extractPieceFromModule = exports.generateMetadata = void 0;
var get_available_piece_names_1 = require("../utils/get-available-piece-names");
var files_1 = require("../utils/files");
var validate_metadata_1 = require("./validate-metadata");
var byDisplayNameIgnoreCase = function (a, b) {
    var aName = a.displayName.toUpperCase();
    var bName = b.displayName.toUpperCase();
    return aName.localeCompare(bName, 'en');
};
var generateMetadata = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pieces, piecePackageNames, _i, piecePackageNames_1, packageName, packagePath, packageJson, module_1, pieceName, pieceVersion, piece, metadata;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log('generateMetadata');
                pieces = [];
                return [4 /*yield*/, (0, get_available_piece_names_1.getAvailablePieceNames)()];
            case 1:
                piecePackageNames = _c.sent();
                _i = 0, piecePackageNames_1 = piecePackageNames;
                _c.label = 2;
            case 2:
                if (!(_i < piecePackageNames_1.length)) return [3 /*break*/, 6];
                packageName = piecePackageNames_1[_i];
                packagePath = "packages/pieces/".concat(packageName);
                return [4 /*yield*/, (0, files_1.readPackageJson)(packagePath)];
            case 3:
                packageJson = _c.sent();
                return [4 /*yield*/, Promise.resolve("".concat("".concat(packagePath, "/src/index.ts"))).then(function (s) { return require(s); })];
            case 4:
                module_1 = _c.sent();
                pieceName = packageJson.name, pieceVersion = packageJson.version;
                piece = (0, exports.extractPieceFromModule)({
                    module: module_1,
                    pieceName: pieceName,
                    pieceVersion: pieceVersion
                });
                piece.name = packageJson.name;
                piece.version = packageJson.version;
                piece.minimumSupportedRelease = (_a = piece.minimumSupportedRelease) !== null && _a !== void 0 ? _a : '0.0.0';
                piece.maximumSupportedRelease =
                    (_b = piece.maximumSupportedRelease) !== null && _b !== void 0 ? _b : '99999.99999.9999';
                metadata = __assign(__assign({}, piece.metadata()), { name: piece.name, version: piece.version });
                (0, validate_metadata_1.validateMetadata)(metadata);
                pieces.push(metadata);
                _c.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6:
                pieces.sort(byDisplayNameIgnoreCase);
                return [2 /*return*/, pieces];
        }
    });
}); };
exports.generateMetadata = generateMetadata;
var extractPieceFromModule = function (params) {
    var module = params.module, pieceName = params.pieceName, pieceVersion = params.pieceVersion;
    var exports = Object.values(module);
    for (var _i = 0, exports_1 = exports; _i < exports_1.length; _i++) {
        var e = exports_1[_i];
        if (e !== null && e !== undefined && e.constructor.name === 'Piece') {
            return e;
        }
    }
    throw new Error("Can't find constructor");
};
exports.extractPieceFromModule = extractPieceFromModule;
