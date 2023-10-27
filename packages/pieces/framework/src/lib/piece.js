"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPiece = exports.Piece = void 0;
var Piece = /** @class */ (function () {
    function Piece(displayName, logoUrl, authors, events, actions, triggers, auth, minimumSupportedRelease, maximumSupportedRelease, description, categories) {
        var _this = this;
        if (description === void 0) { description = ''; }
        this.displayName = displayName;
        this.logoUrl = logoUrl;
        this.authors = authors;
        this.events = events;
        this.auth = auth;
        this.minimumSupportedRelease = minimumSupportedRelease;
        this.maximumSupportedRelease = maximumSupportedRelease;
        this.description = description;
        this.categories = categories;
        this._actions = {};
        this._triggers = {};
        actions.forEach(function (action) { return _this._actions[action.name] = action; });
        triggers.forEach(function (trigger) { return _this._triggers[trigger.name] = trigger; });
    }
    Piece.prototype.metadata = function () {
        return {
            displayName: this.displayName,
            logoUrl: this.logoUrl,
            actions: this._actions,
            triggers: this._triggers,
            description: this.description,
            auth: this.auth,
            minimumSupportedRelease: this.minimumSupportedRelease,
            maximumSupportedRelease: this.maximumSupportedRelease,
        };
    };
    Piece.prototype.getAction = function (actionName) {
        return this._actions[actionName];
    };
    Piece.prototype.getTrigger = function (triggerName) {
        return this._triggers[triggerName];
    };
    Piece.prototype.actions = function () {
        return this._actions;
    };
    Piece.prototype.triggers = function () {
        return this._triggers;
    };
    return Piece;
}());
exports.Piece = Piece;
var createPiece = function (params) {
    var _a, _b;
    return new Piece(params.displayName, params.logoUrl, (_a = params.authors) !== null && _a !== void 0 ? _a : [], params.events, params.actions, params.triggers, (_b = params.auth) !== null && _b !== void 0 ? _b : undefined, params.minimumSupportedRelease, params.maximumSupportedRelease, params.description, params.categories);
};
exports.createPiece = createPiece;
