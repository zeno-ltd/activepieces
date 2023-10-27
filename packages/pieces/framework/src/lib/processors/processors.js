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
exports.Processors = void 0;
var property_1 = require("../property");
var dayjs_1 = require("dayjs");
var timezone_1 = require("dayjs/plugin/timezone");
var utc_1 = require("dayjs/plugin/utc");
var is_base64_1 = require("is-base64");
var axios_1 = require("axios");
var shared_1 = require("@activepieces/shared");
var Processors = /** @class */ (function () {
    function Processors() {
    }
    var _a;
    _a = Processors;
    Processors.number = function (property, value) {
        if ((0, shared_1.isNil)(value)) {
            return value;
        }
        if (value === '') {
            return NaN;
        }
        return Number(value);
    };
    Processors.datetime = function (property, value) {
        dayjs_1.default.extend(utc_1.default);
        dayjs_1.default.extend(timezone_1.default);
        var dateTimeString = value;
        try {
            if (!dateTimeString)
                throw Error('Undefined input');
            return dayjs_1.default.tz(dateTimeString, 'UTC').toISOString();
        }
        catch (error) {
            console.error(error);
            return undefined;
        }
    };
    Processors.file = function (property, urlOrBase64) { return __awaiter(void 0, void 0, void 0, function () {
        var matches, base64, contentType_1, filename_1, extension_1, response, contentType, fileResponse, filename, extension, e_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    // convertUrlOrBase64ToFile
                    if ((0, shared_1.isNil)(urlOrBase64) || !(0, shared_1.isString)(urlOrBase64)) {
                        return [2 /*return*/, null];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    // Check if the string is a Base64 string
                    if ((0, is_base64_1.default)(urlOrBase64, { allowMime: true })) {
                        matches = urlOrBase64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
                        base64 = urlOrBase64;
                        contentType_1 = null;
                        if (matches && (matches === null || matches === void 0 ? void 0 : matches.length) === 3) {
                            contentType_1 = matches[1];
                            base64 = matches[2];
                            filename_1 = 'unknown';
                            extension_1 = contentType_1.split('/')[1];
                            return [2 /*return*/, new property_1.ApFile(filename_1 + "." + extension_1, Buffer.from(base64, 'base64'), extension_1)];
                        }
                    }
                    return [4 /*yield*/, axios_1.default.head(urlOrBase64)];
                case 2:
                    response = _b.sent();
                    contentType = response.headers['content-type'];
                    console.info("Content type: ".concat(contentType));
                    // Check if content type is file
                    if (!contentType || !(contentType.startsWith('application/') || contentType.startsWith("image") || contentType.startsWith("audio") || contentType.startsWith("video") || contentType === 'application/octet-stream')) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, axios_1.default.get(urlOrBase64, {
                            responseType: 'arraybuffer',
                        })];
                case 3:
                    fileResponse = _b.sent();
                    filename = urlOrBase64.substring(urlOrBase64.lastIndexOf('/') + 1);
                    extension = filename.split('.').pop();
                    // Return the ApFile object
                    return [2 /*return*/, new property_1.ApFile(filename, Buffer.from(fileResponse.data, 'binary'), extension)];
                case 4:
                    e_1 = _b.sent();
                    console.error(e_1);
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return Processors;
}());
exports.Processors = Processors;
