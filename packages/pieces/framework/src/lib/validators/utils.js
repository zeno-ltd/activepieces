"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatErrorMessage = void 0;
function formatErrorMessage(errorMessage, tokens) {
    var formattedMessage = errorMessage;
    for (var key in tokens) {
        formattedMessage = formattedMessage.replace("{".concat(key, "}"), tokens[key]);
    }
    return formattedMessage;
}
exports.formatErrorMessage = formatErrorMessage;
