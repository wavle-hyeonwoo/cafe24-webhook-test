const { default: axios } = require("axios");

module.exports = async function (authcode) {
  axios.post(
    `https://clubpetworld.cafe24api.com/api/v2/oauth/token`,
    {
      code,
      grant_type: "authorization_code",
    },
    {
      headers: {
        "Content-Type": "x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          process.env.CAFE24_CLIENT_ID + ":" + process.env.CAFE24_CLIENT_SECRET
        ).toString("base64")}`,
      },
    }
  );
};