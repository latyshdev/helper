const {axiosRequest} = require('./../request.js');
const Config = require('./../../configs/ads.json');

/* ========================================================================= */
const browserStatusBySN = async (userid) => {
  try {
    const requestConfig = {};
    requestConfig.method = `GET`;
    const url = `${Config.API_ENDPOINT}:${Config.API_PORT}` + 
      `/api/v1/browser/active?serial_number=${userid}`;
    const response = await axiosRequest(url, requestConfig);
    if (response?.data?.data) return response.data.data;
    return null;
  } catch (err) {
      throw err.message;
  }
};

/* ========================================================================= */
// ADS exports
exports.browserStatusBySN = browserStatusBySN;