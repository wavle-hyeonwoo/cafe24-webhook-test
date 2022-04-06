const { default: axios } = require("axios");

module.exports = async function (authcode) {
  axios
    .post(
      `https://clubpetworld.cafe24api.com/api/v2/oauth/token`,
      {
        code: authcode,
        grant_type: "authorization_code",
        redirect_uri:
          "https://cafe24-webhook-test.herokuapp.com/cafe24/accesstoken",
      },
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
    .catch((e) => {
      console.error("ERROR get-token", e.message);
    });
};
