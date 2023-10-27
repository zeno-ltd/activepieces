"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelegatingAuthenticationConverter = void 0;
var http_header_1 = require("./http-header");
var authentication_1 = require("../../authentication");
var DelegatingAuthenticationConverter = /** @class */ (function () {
    function DelegatingAuthenticationConverter(bearerTokenConverter, basicTokenConverter) {
        var _a;
        if (bearerTokenConverter === void 0) { bearerTokenConverter = new BearerTokenAuthenticationConverter(); }
        if (basicTokenConverter === void 0) { basicTokenConverter = new BasicTokenAuthenticationConverter(); }
        this.converters = (_a = {},
            _a[authentication_1.AuthenticationType.BEARER_TOKEN] = bearerTokenConverter,
            _a[authentication_1.AuthenticationType.BASIC] = basicTokenConverter,
            _a);
    }
    DelegatingAuthenticationConverter.prototype.convert = function (authentication, headers) {
        var converter = this.converters[authentication.type];
        return converter.convert(authentication, headers);
    };
    return DelegatingAuthenticationConverter;
}());
exports.DelegatingAuthenticationConverter = DelegatingAuthenticationConverter;
var BearerTokenAuthenticationConverter = /** @class */ (function () {
    function BearerTokenAuthenticationConverter() {
    }
    BearerTokenAuthenticationConverter.prototype.convert = function (authentication, headers) {
        headers[http_header_1.HttpHeader.AUTHORIZATION] = "Bearer ".concat(authentication.token);
        return headers;
    };
    return BearerTokenAuthenticationConverter;
}());
var BasicTokenAuthenticationConverter = /** @class */ (function () {
    function BasicTokenAuthenticationConverter() {
    }
    BasicTokenAuthenticationConverter.prototype.convert = function (authentication, headers) {
        var credentials = "".concat(authentication.username, ":").concat(authentication.password);
        var encoded = Buffer.from(credentials).toString('base64');
        headers[http_header_1.HttpHeader.AUTHORIZATION] = "Basic ".concat(encoded);
        return headers;
    };
    return BasicTokenAuthenticationConverter;
}());
