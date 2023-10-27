"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatErrorMessage = exports.ErrorMessages = exports.Validators = void 0;
var lodash_1 = require("lodash");
var errors_1 = require("./errors");
Object.defineProperty(exports, "ErrorMessages", { enumerable: true, get: function () { return errors_1.ErrorMessages; } });
var types_1 = require("./types");
var utils_1 = require("./utils");
Object.defineProperty(exports, "formatErrorMessage", { enumerable: true, get: function () { return utils_1.formatErrorMessage; } });
var dayjs_1 = require("dayjs");
var Validators = /** @class */ (function () {
    function Validators() {
    }
    Validators.pattern = function (regex) {
        return {
            type: types_1.ValidationInputType.STRING,
            fn: function (property, processedValue, userInput) {
                if ((0, lodash_1.isEmpty)(processedValue))
                    return null;
                if (typeof regex === 'string') {
                    regex = new RegExp(regex);
                }
                return regex.test(String(processedValue))
                    ? null
                    : (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.REGEX, {
                        property: property === null || property === void 0 ? void 0 : property.displayName,
                    });
            },
        };
    };
    Validators.prohibitPattern = function (regex) {
        return {
            type: types_1.ValidationInputType.STRING,
            fn: function (property, processedValue, userInput) {
                var patternValidator = Validators.pattern(regex);
                var patternError = patternValidator.fn(property, processedValue, userInput);
                return patternError
                    ? null
                    : (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.PROHIBIT_REGEX, {
                        property: property.displayName,
                    });
            },
        };
    };
    Validators.maxLength = function (max) {
        return {
            type: types_1.ValidationInputType.STRING,
            fn: function (property, processedValue, userInput) {
                if ((0, lodash_1.isEmpty)(processedValue))
                    return null;
                var isValid = processedValue.length <= max;
                if (!isValid) {
                    return (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.MAX_LENGTH, {
                        userInput: userInput,
                        length: max.toString(),
                    });
                }
                return null;
            },
        };
    };
    Validators.minLength = function (min) {
        return {
            type: types_1.ValidationInputType.STRING,
            fn: function (property, processedValue, userInput) {
                if ((0, lodash_1.isEmpty)(processedValue))
                    return null;
                var isValid = processedValue.length >= min;
                if (!isValid) {
                    return (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.MIN_LENGTH, {
                        userInput: userInput,
                        length: min.toString(),
                    });
                }
                return null;
            },
        };
    };
    Validators.minValue = function (min) {
        return {
            type: types_1.ValidationInputType.NUMBER,
            fn: function (property, processedValue, userInput) {
                var isValid = Number(processedValue) >= min;
                if (isValid)
                    return null;
                return (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.MIN, { userInput: userInput, min: min });
            },
        };
    };
    Validators.maxValue = function (max) {
        return {
            type: types_1.ValidationInputType.NUMBER,
            fn: function (property, processedValue, userInput) {
                var isValid = Number(processedValue) <= max;
                if (isValid)
                    return null;
                return (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.MAX, { userInput: userInput, max: max });
            },
        };
    };
    Validators.minDate = function (min, unit, includeBounds) {
        if (unit === void 0) { unit = 'day'; }
        if (includeBounds === void 0) { includeBounds = false; }
        return {
            type: types_1.ValidationInputType.DATE_TIME,
            fn: function (property, processedValue, userInput) {
                var dateValue = (0, dayjs_1.default)(processedValue);
                var minDate = (0, dayjs_1.default)(min);
                if (!minDate.isValid())
                    return null;
                var isValid = includeBounds
                    ? dateValue.isAfter(minDate, unit)
                    : dateValue.isSame(minDate, unit) && dateValue.isAfter(minDate, unit);
                if (isValid)
                    return null;
                return (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.MIN_DATE, {
                    userInput: dateValue.toISOString(),
                    min: minDate.toISOString(),
                });
            },
        };
    };
    Validators.maxDate = function (max, unit, includeBounds) {
        if (unit === void 0) { unit = 'day'; }
        if (includeBounds === void 0) { includeBounds = false; }
        return {
            type: types_1.ValidationInputType.DATE_TIME,
            fn: function (property, processedValue, userInput) {
                var dateValue = (0, dayjs_1.default)(processedValue);
                var maxDate = (0, dayjs_1.default)(max);
                if (!maxDate.isValid())
                    return null;
                var isValid = includeBounds
                    ? dateValue.isBefore(maxDate, unit)
                    : dateValue.isSame(maxDate, unit) &&
                        dateValue.isBefore(maxDate, unit);
                if (isValid)
                    return null;
                return (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.MAX_DATE, {
                    userInput: dateValue.toISOString(),
                    max: maxDate.toISOString(),
                });
            },
        };
    };
    Validators.inRange = function (min, max) {
        return {
            type: types_1.ValidationInputType.NUMBER,
            fn: function (property, processedValue, userInput) {
                var numericValue = Number(processedValue);
                var isValid = numericValue <= max && numericValue >= min;
                if (isValid)
                    return null;
                return (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.IN_RANGE, {
                    userInput: userInput,
                    min: min,
                    max: max,
                });
            },
        };
    };
    Validators.inDateRange = function (min, max, unit, includeBounds) {
        if (unit === void 0) { unit = 'day'; }
        if (includeBounds === void 0) { includeBounds = false; }
        return {
            type: types_1.ValidationInputType.DATE_TIME,
            fn: function (property, processedValue) {
                var dateValue = (0, dayjs_1.default)(processedValue);
                var minDate = (0, dayjs_1.default)(min);
                var maxDate = (0, dayjs_1.default)(max);
                var validRanges = minDate.isValid() && maxDate.isValid();
                if (!validRanges)
                    return null;
                var isValid = includeBounds
                    ? (dateValue.isBefore(maxDate, unit) ||
                        dateValue.isSame(maxDate, unit)) &&
                        (dateValue.isAfter(minDate, unit) ||
                            dateValue.isSame(minDate, unit))
                    : dateValue.isBefore(maxDate, unit) &&
                        dateValue.isAfter(minDate, unit);
                if (isValid)
                    return null;
                return (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.IN_RANGE, {
                    userInput: dateValue.toISOString(),
                    min: minDate.toISOString(),
                    max: maxDate.toISOString(),
                });
            },
        };
    };
    Validators.oneOf = function (values) {
        return {
            type: types_1.ValidationInputType.ANY,
            fn: function (property, processedValue, userInput) {
                if (Array.isArray(values)) {
                    return values.includes(processedValue)
                        ? null
                        : (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.ONE_OF, {
                            userInput: userInput,
                            choices: values,
                        });
                }
                return null;
            },
        };
    };
    Validators.requireKeys = function (values) {
        return {
            type: types_1.ValidationInputType.OBJECT,
            fn: function (property, processedValue, userInput) {
                if (Array.isArray(values)) {
                    var missingKeys = values.filter(function (key) { return !processedValue[key]; });
                    return missingKeys.length
                        ? (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.REQUIRE_KEYS, {
                            userInput: userInput,
                            keys: missingKeys.join(', '),
                        })
                        : null;
                }
                return null;
            },
        };
    };
    Validators.number = {
        type: types_1.ValidationInputType.NUMBER,
        fn: function (property, processedValue, userInput) {
            if (isNaN(processedValue)) {
                return (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.NUMBER, { userInput: userInput });
            }
            return null;
        },
    };
    Validators.nonZero = {
        type: types_1.ValidationInputType.NUMBER,
        fn: function (property, processedValue, userInput) {
            if (processedValue === 0) {
                return (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.NON_ZERO, { userInput: userInput });
            }
            return null;
        },
    };
    Validators.integer = {
        type: types_1.ValidationInputType.NUMBER,
        fn: function (property, processedValue, userInput) {
            if ((0, lodash_1.isInteger)(processedValue)) {
                return (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.WHOLE_NUMBER, { userInput: userInput });
            }
            return null;
        },
    };
    Validators.image = {
        type: types_1.ValidationInputType.FILE,
        fn: function (property, processedValue, userInput) {
            var regex = /\.(jpg|svg|jpeg|png|bmp|gif|webp)$/i;
            return regex.test(processedValue.name)
                ? null
                : (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.IMAGE, { property: property });
        },
    };
    Validators.email = {
        type: types_1.ValidationInputType.STRING,
        fn: function (property, processedValue, userInput) {
            var pattern = new RegExp('^(([^<>()\\[\\].,;:\\s@"]+(\\.[^<>()\\[\\].,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z-0-9]+\\.)+[a-zA-Z]{2,}))$');
            if ((0, lodash_1.isEmpty)(processedValue)) {
                return null;
            }
            if ((0, lodash_1.isEmpty)(processedValue))
                return null;
            return pattern.test(String(processedValue))
                ? null
                : (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.EMAIL, { userInput: userInput });
        },
    };
    Validators.url = {
        type: types_1.ValidationInputType.STRING,
        fn: function (property, processedValue, userInput) {
            var pattern = new RegExp('^((https?|ftp|file)://)?' + // protocol
                '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-zA-Z\\d_]*)?$' // fragment locator
            );
            if ((0, lodash_1.isEmpty)(processedValue))
                return null;
            return pattern.test(String(processedValue))
                ? null
                : (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.URL, { userInput: userInput });
        },
    };
    Validators.datetimeIso = {
        type: types_1.ValidationInputType.DATE_TIME,
        fn: function (property, processedValue, userInput) {
            if (property.required && (0, lodash_1.isNil)(processedValue)) {
                return (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.ISO_DATE, { userInput: userInput });
            }
            return null;
        },
    };
    Validators.file = {
        type: types_1.ValidationInputType.FILE,
        fn: function (property, processedValue, userInput) {
            if (property.required && (0, lodash_1.isNil)(processedValue)) {
                return (0, utils_1.formatErrorMessage)(errors_1.ErrorMessages.FILE, { userInput: userInput });
            }
            return null;
        },
    };
    return Validators;
}());
exports.Validators = Validators;
