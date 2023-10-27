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
exports.BaseHttpClient = void 0;
var http_header_1 = require("./http-header");
var media_type_1 = require("./media-type");
var node_url_1 = require("node:url");
var BaseHttpClient = /** @class */ (function () {
    function BaseHttpClient(baseUrl, authenticationConverter) {
        this.baseUrl = baseUrl;
        this.authenticationConverter = authenticationConverter;
    }
    BaseHttpClient.prototype.getUrl = function (request) {
        var url = new node_url_1.URL("".concat(this.baseUrl).concat(request.url));
        return url.toString();
    };
    BaseHttpClient.prototype.getHeaders = function (request) {
        var _a;
        var _b;
        var requestHeaders = (_a = {},
            _a[http_header_1.HttpHeader.ACCEPT] = media_type_1.MediaType.APPLICATION_JSON,
            _a);
        if (request.authentication) {
            this.populateAuthentication(request.authentication, requestHeaders);
        }
        if (request.body) {
            switch ((_b = request.headers) === null || _b === void 0 ? void 0 : _b['Content-Type']) {
                case 'text/csv':
                    requestHeaders[http_header_1.HttpHeader.CONTENT_TYPE] = media_type_1.MediaType.TEXT_CSV;
                    break;
                default:
                    requestHeaders[http_header_1.HttpHeader.CONTENT_TYPE] = media_type_1.MediaType.APPLICATION_JSON;
                    break;
            }
        }
        if (request.headers) {
            requestHeaders = __assign(__assign({}, requestHeaders), request.headers);
        }
        return requestHeaders;
    };
    BaseHttpClient.prototype.populateAuthentication = function (authentication, headers) {
        this.authenticationConverter.convert(authentication, headers);
    };
    return BaseHttpClient;
}());
exports.BaseHttpClient = BaseHttpClient;
