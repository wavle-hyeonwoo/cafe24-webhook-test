const { default: axios } = require("axios");
const qs = require("querystring");

module.exports = async function (authcode) {
  const url = `https://clubpetworld.cafe24api.com/api/v2/oauth/token`;
  const payload = qs.encode({
    code: authcode,
    grant_type: "authorization_code",
    redirect_uri:
      "https://cafe24-webhook-test.herokuapp.com/cafe24/accesstoken",
  });
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${Buffer.from(
      process.env.CAFE24_CLIENT_ID + ":" + process.env.CAFE24_CLIENT_SECRET
    ).toString("base64")}`,
  };

  // send request
  axios
    .post(url, payload, {
      headers,
    })
    .then((res) => {
      console.log("ACCESS TOKEN!!!! \n", res.data);
    })
    .catch((e) => {
      console.error("ERROR get-token", e);
    });
};
