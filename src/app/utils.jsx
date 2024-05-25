
let utils = {
    isValidNumber: function isValidNumber(n) {
        return typeof n == 'number' && !isNaN(n) && isFinite(n);
    },
    deepClone: function deepClone(o) {
        return JSON.parse(JSON.stringify(o));
    }
};

export default utils;

