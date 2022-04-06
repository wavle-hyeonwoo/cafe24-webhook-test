const { default: axios } = require("axios");
const fetch = require("node-fetch");
const qs = require("querystring");
const { URLSearchParams } = require("url");

module.exports = async function (authcode) {
  const url = `https://clubpetworld.cafe24api.com/api/v2/oauth/token`;
  axios
    .post(
      url,
      qs.encode({
        code: authcode,
        grant_type: "authorization_code",
        redirect_uri:
          "https://cafe24-webhook-test.herokuapp.com/cafe24/accesstoken",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            process.env.CAFE24_CLIENT_ID +
              ":" +
              process.env.CAFE24_CLIENT_SECRET
          ).toString("base64")}`,
        },
      }
    )
    .then((res) => {
      console.log("ACCESS TOKEN!!!! \n", res.data);
    })
    .catch((e) => {
      console.error("ERROR get-token", e);
    });
};
