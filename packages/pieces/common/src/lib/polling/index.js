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
exports.pollingHelper = exports.DedupeStrategy = void 0;
var shared_1 = require("@activepieces/shared");
var DedupeStrategy;
(function (DedupeStrategy) {
    DedupeStrategy[DedupeStrategy["TIMEBASED"] = 0] = "TIMEBASED";
    DedupeStrategy[DedupeStrategy["LAST_ITEM"] = 1] = "LAST_ITEM";
})(DedupeStrategy || (exports.DedupeStrategy = DedupeStrategy = {}));
exports.pollingHelper = {
    poll: function (polling, _a) {
        var _b, _c, _d;
        var store = _a.store, auth = _a.auth, propsValue = _a.propsValue, maxItemsToPoll = _a.maxItemsToPoll;
        return __awaiter(this, void 0, void 0, function () {
            var _e, lastEpochMilliSeconds_1, items, newLastEpochMilliSeconds, lastItemId_1, items, lastItemIndex, newItems, newLastItem;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _e = polling.strategy;
                        switch (_e) {
                            case DedupeStrategy.TIMEBASED: return [3 /*break*/, 1];
                            case DedupeStrategy.LAST_ITEM: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 10];
                    case 1: return [4 /*yield*/, store.get("lastPoll")];
                    case 2:
                        lastEpochMilliSeconds_1 = (_b = (_f.sent())) !== null && _b !== void 0 ? _b : 0;
                        return [4 /*yield*/, polling.items({ store: store, auth: auth, propsValue: propsValue, lastFetchEpochMS: lastEpochMilliSeconds_1 })];
                    case 3:
                        items = _f.sent();
                        newLastEpochMilliSeconds = items.reduce(function (acc, item) { return Math.max(acc, item.epochMilliSeconds); }, lastEpochMilliSeconds_1);
                        return [4 /*yield*/, store.put("lastPoll", newLastEpochMilliSeconds)];
                    case 4:
                        _f.sent();
                        return [2 /*return*/, items.filter(function (f) { return f.epochMilliSeconds > lastEpochMilliSeconds_1; }).map(function (item) { return item.data; })];
                    case 5: return [4 /*yield*/, store.get("lastItem")];
                    case 6:
                        lastItemId_1 = (_f.sent());
                        return [4 /*yield*/, polling.items({ store: store, auth: auth, propsValue: propsValue, lastItemId: lastItemId_1 })];
                    case 7:
                        items = _f.sent();
                        lastItemIndex = items.findIndex(function (f) { return f.id === lastItemId_1; });
                        newItems = [];
                        if ((0, shared_1.isNil)(lastItemId_1) || lastItemIndex == -1) {
                            newItems = items !== null && items !== void 0 ? items : [];
                        }
                        else {
                            newItems = (_c = items === null || items === void 0 ? void 0 : items.slice(0, lastItemIndex)) !== null && _c !== void 0 ? _c : [];
                        }
                        // Sorted from newest to oldest
                        if (!(0, shared_1.isNil)(maxItemsToPoll)) {
                            // Get the last polling.maxItemsToPoll items
                            newItems = newItems.slice(-maxItemsToPoll);
                        }
                        newLastItem = (_d = newItems === null || newItems === void 0 ? void 0 : newItems[0]) === null || _d === void 0 ? void 0 : _d.id;
                        if (!!(0, shared_1.isNil)(newLastItem)) return [3 /*break*/, 9];
                        return [4 /*yield*/, store.put("lastItem", newLastItem)];
                    case 8:
                        _f.sent();
                        _f.label = 9;
                    case 9: return [2 /*return*/, newItems.map(function (item) { return item.data; })];
                    case 10: return [2 /*return*/];
                }
            });
        });
    },
    onEnable: function (polling, _a) {
        var _b;
        var store = _a.store, auth = _a.auth, propsValue = _a.propsValue;
        return __awaiter(this, void 0, void 0, function () {
            var _c, items, lastItemId;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _c = polling.strategy;
                        switch (_c) {
                            case DedupeStrategy.TIMEBASED: return [3 /*break*/, 1];
                            case DedupeStrategy.LAST_ITEM: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 9];
                    case 1: return [4 /*yield*/, store.put("lastPoll", Date.now())];
                    case 2:
                        _d.sent();
                        return [3 /*break*/, 9];
                    case 3: return [4 /*yield*/, polling.items({ store: store, auth: auth, propsValue: propsValue, lastItemId: null })];
                    case 4:
                        items = (_d.sent());
                        lastItemId = (_b = items === null || items === void 0 ? void 0 : items[0]) === null || _b === void 0 ? void 0 : _b.id;
                        if (!!(0, shared_1.isNil)(lastItemId)) return [3 /*break*/, 6];
                        return [4 /*yield*/, store.put("lastItem", lastItemId)];
                    case 5:
                        _d.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, store.delete("lastItem")];
                    case 7:
                        _d.sent();
                        _d.label = 8;
                    case 8: return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    },
    onDisable: function (polling, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (polling.strategy) {
                    case DedupeStrategy.TIMEBASED:
                    case DedupeStrategy.LAST_ITEM:
                        return [2 /*return*/];
                }
                return [2 /*return*/];
            });
        });
    },
    test: function (polling, _a) {
        var auth = _a.auth, propsValue = _a.propsValue, store = _a.store;
        return __awaiter(this, void 0, void 0, function () {
            var items, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        items = [];
                        _b = polling.strategy;
                        switch (_b) {
                            case DedupeStrategy.TIMEBASED: return [3 /*break*/, 1];
                            case DedupeStrategy.LAST_ITEM: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, polling.items({ store: store, auth: auth, propsValue: propsValue, lastFetchEpochMS: 0 })];
                    case 2:
                        items = _c.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, polling.items({ store: store, auth: auth, propsValue: propsValue, lastItemId: null })];
                    case 4:
                        items = _c.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, getFirstFiveOrAll(items.map(function (item) { return item.data; }))];
                }
            });
        });
    }
};
function getFirstFiveOrAll(array) {
    if (array.length <= 5) {
        return array;
    }
    else {
        return array.slice(0, 5);
    }
}
