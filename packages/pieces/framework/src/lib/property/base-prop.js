"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApFile = void 0;
var ApFile = /** @class */ (function () {
    function ApFile(filename, data, extension) {
        this.filename = filename;
        this.data = data;
        this.extension = extension;
    }
    Object.defineProperty(ApFile.prototype, "base64", {
        get: function () {
            return this.data.toString('base64');
        },
        enumerable: false,
        configurable: true
    });
    return ApFile;
}());
exports.ApFile = ApFile;
