const {axiosRequest} = require('./../request.js');
const Config = require('./../../configs/ads.json');

/* ========================================================================= */
// Returns status, ws or null
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
      console.log(`browserStatusBySN ERROR: ${err.message}`);
      console.error(err);
      return null;
  }
};

/* ========================================================================= */
// ADS exports
exports.browserStatusBySN = browserStatusBySN;



/* ========================================================================= */
// ADS tests

/*
  const Ads = require('./src/AdsPower/index')

  ;(async () => {
    console.log(await Ads.browserStatusBySN(`2`).catch(err => err)); // CLOSED: { status: 'Inactive' }
    console.log(await Ads.browserStatusBySN(`1`).catch(err => err)); // CLOSED: { status: 'Active', ws: {}, debug_port /// }
  })();
*/