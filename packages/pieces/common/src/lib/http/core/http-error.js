"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    function HttpError(_requestBody, _err) {
        var _a, _b;
        var _this = _super.call(this, JSON.stringify({
            response: {
                status: ((_a = _err === null || _err === void 0 ? void 0 : _err.response) === null || _a === void 0 ? void 0 : _a.status) || 500,
                body: (_b = _err === null || _err === void 0 ? void 0 : _err.response) === null || _b === void 0 ? void 0 : _b.data
            },
            request: {
                body: _requestBody
            }
        })) || this;
        _this._requestBody = _requestBody;
        _this._err = _err;
        return _this;
    }
    HttpError.prototype.errorMessage = function () {
        var _a, _b, _c, _d;
        return {
            response: {
                status: ((_b = (_a = this._err) === null || _a === void 0 ? void 0 : _a.response) === null || _b === void 0 ? void 0 : _b.status) || 500,
                body: (_d = (_c = this._err) === null || _c === void 0 ? void 0 : _c.response) === null || _d === void 0 ? void 0 : _d.data
            },
            request: {
                body: this._requestBody
            }
        };
    };
    Object.defineProperty(HttpError.prototype, "response", {
        get: function () {
            var _a, _b, _c, _d;
            return {
                status: ((_b = (_a = this._err) === null || _a === void 0 ? void 0 : _a.response) === null || _b === void 0 ? void 0 : _b.status) || 500,
                body: (_d = (_c = this._err) === null || _c === void 0 ? void 0 : _c.response) === null || _d === void 0 ? void 0 : _d.data
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpError.prototype, "request", {
        get: function () {
            return {
                body: this._requestBody
            };
        },
        enumerable: false,
        configurable: true
    });
    return HttpError;
}(Error));
exports.HttpError = HttpError;
