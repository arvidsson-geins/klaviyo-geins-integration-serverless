const util = require("../global/util.js");
const KlaviyoSdk = require('klaviyo-api');

module.exports = async function (context, req) {
  // set default response
  let response = util.Response.unauthorized();
  // get origin from context user-Agent
  const origin = context.req.headers['user-agent'];
  // get action and payload from query string or body
  const { action, payload } = req.query || req.body || {};
  const object = { action, payload };
  // log request
  util.logger.saveLog(origin, action, object);
  // validate action and payload
  if (!action || !payload) {
    response = util.Response.badRequest("action and payload are required");
    context.res = response;
    return;
  }

  const fieldsProfile = ["email"];
  const fieldsList = ["name"];
  const profileId = "01GJAZVKHNEKK5CRHXR0FBP9W4";
  const opts = {};

  const klaviyoClient = new util.KlaviyoAPI();
  try {
    const retval = await klaviyoClient.getProfiles(opts);
    response = util.Response.success(retval);
  } catch (error) {
    response = util.Response.internalServerError(error.message);
  }

  // return response
  context.res = response;
}