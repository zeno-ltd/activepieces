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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PieceAuth = exports.Property = exports.PropertyType = void 0;
var processors_1 = require("../processors/processors");
var validators_1 = require("../validators/validators");
var PropertyType;
(function (PropertyType) {
    PropertyType["SHORT_TEXT"] = "SHORT_TEXT";
    PropertyType["LONG_TEXT"] = "LONG_TEXT";
    PropertyType["MARKDOWN"] = "MARKDOWN";
    PropertyType["DROPDOWN"] = "DROPDOWN";
    PropertyType["STATIC_DROPDOWN"] = "STATIC_DROPDOWN";
    PropertyType["NUMBER"] = "NUMBER";
    PropertyType["CHECKBOX"] = "CHECKBOX";
    PropertyType["OAUTH2"] = "OAUTH2";
    PropertyType["SECRET_TEXT"] = "SECRET_TEXT";
    PropertyType["ARRAY"] = "ARRAY";
    PropertyType["OBJECT"] = "OBJECT";
    PropertyType["BASIC_AUTH"] = "BASIC_AUTH";
    PropertyType["JSON"] = "JSON";
    PropertyType["MULTI_SELECT_DROPDOWN"] = "MULTI_SELECT_DROPDOWN";
    PropertyType["STATIC_MULTI_SELECT_DROPDOWN"] = "STATIC_MULTI_SELECT_DROPDOWN";
    PropertyType["DYNAMIC"] = "DYNAMIC";
    PropertyType["CUSTOM_AUTH"] = "CUSTOM_AUTH";
    PropertyType["DATE_TIME"] = "DATE_TIME";
    PropertyType["FILE"] = "FILE";
})(PropertyType || (exports.PropertyType = PropertyType = {}));
exports.Property = {
    ShortText: function (request) {
        return __assign(__assign({}, request), { valueSchema: undefined, type: PropertyType.SHORT_TEXT });
    },
    Checkbox: function (request) {
        return __assign(__assign({}, request), { valueSchema: undefined, type: PropertyType.CHECKBOX });
    },
    LongText: function (request) {
        return __assign(__assign({}, request), { valueSchema: undefined, type: PropertyType.LONG_TEXT });
    },
    MarkDown: function (request) {
        return { displayName: 'Markdown', required: true, description: request.value, type: PropertyType.MARKDOWN, valueSchema: undefined };
    },
    Number: function (request) {
        return __assign(__assign({}, request), { defaultProcessors: [processors_1.Processors.number], defaultValidators: [validators_1.Validators.number], valueSchema: undefined, type: PropertyType.NUMBER });
    },
    Json: function (request) {
        return __assign(__assign({}, request), { valueSchema: undefined, type: PropertyType.JSON });
    },
    Array: function (request) {
        return __assign(__assign({}, request), { valueSchema: undefined, type: PropertyType.ARRAY });
    },
    Object: function (request) {
        return __assign(__assign({}, request), { valueSchema: undefined, type: PropertyType.OBJECT });
    },
    Dropdown: function (request) {
        return __assign(__assign({}, request), { valueSchema: undefined, type: PropertyType.DROPDOWN });
    },
    StaticDropdown: function (request) {
        return __assign(__assign({}, request), { valueSchema: undefined, type: PropertyType.STATIC_DROPDOWN });
    },
    MultiSelectDropdown: function (request) {
        return __assign(__assign({}, request), { valueSchema: undefined, type: PropertyType.MULTI_SELECT_DROPDOWN });
    },
    DynamicProperties: function (request) {
        return __assign(__assign({}, request), { valueSchema: undefined, type: PropertyType.DYNAMIC });
    },
    StaticMultiSelectDropdown: function (request) {
        return __assign(__assign({}, request), { valueSchema: undefined, type: PropertyType.STATIC_MULTI_SELECT_DROPDOWN });
    },
    DateTime: function (request) {
        return __assign(__assign({}, request), { defaultProcessors: [processors_1.Processors.datetime], defaultValidators: [validators_1.Validators.datetimeIso], valueSchema: undefined, type: PropertyType.DATE_TIME });
    },
    File: function (request) {
        return __assign(__assign({}, request), { defaultProcessors: [processors_1.Processors.file], defaultValidators: [validators_1.Validators.file], valueSchema: undefined, type: PropertyType.FILE });
    },
};
exports.PieceAuth = {
    SecretText: function (request) {
        return __assign(__assign({}, request), { valueSchema: undefined, type: PropertyType.SECRET_TEXT });
    },
    BasicAuth: function (request) {
        return __assign(__assign({}, request), { valueSchema: undefined, type: PropertyType.BASIC_AUTH, displayName: 'Connection' });
    },
    CustomAuth: function (request) {
        return __assign(__assign({}, request), { valueSchema: undefined, type: PropertyType.CUSTOM_AUTH, displayName: 'Connection' });
    },
    OAuth2: function (request) {
        return __assign(__assign({}, request), { valueSchema: undefined, type: PropertyType.OAUTH2, displayName: 'Connection' });
    },
    None: function () {
        return undefined;
    }
};
