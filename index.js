/* ========================================================================= */
const pause = async (ms) => await new Promise(r=>setTimeout(r, ms));
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const YEAR = DAY * 365;
const LEAP_YEAR = DAY * 366;

/* ========================================================================= */
exports.pause = pause;
exports.SECOND = SECOND;
exports.MINUTE = MINUTE;
exports.HOUR = HOUR;
exports.DAY = DAY;
exports.WEEK = WEEK;
exports.YEAR = YEAR;
exports.LEAP_YEAR = LEAP_YEAR;