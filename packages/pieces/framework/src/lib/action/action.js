"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAction = exports.IAction = void 0;
var IAction = /** @class */ (function () {
    function IAction(name, displayName, description, props, run, test, requireAuth) {
        this.name = name;
        this.displayName = displayName;
        this.description = description;
        this.props = props;
        this.run = run;
        this.test = test;
        this.requireAuth = requireAuth;
    }
    return IAction;
}());
exports.IAction = IAction;
var createAction = function (params) {
    var _a, _b;
    return new IAction(params.name, params.displayName, params.description, params.props, params.run, (_a = params.test) !== null && _a !== void 0 ? _a : params.run, (_b = params.requireAuth) !== null && _b !== void 0 ? _b : true);
};
exports.createAction = createAction;
