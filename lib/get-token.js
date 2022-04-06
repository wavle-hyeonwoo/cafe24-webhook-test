const { default: axios } = require("axios");
const fetch = require("node-fetch");

module.exports = async function (authcode) {
  const url = `https://clubpetworld.cafe24api.com/api/v2/oauth/token`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        process.env.CAFE24_CLIENT_ID + ":" + process.env.CAFE24_CLIENT_SECRET
      ).toString("base64")}`,
      data: {
        code: authcode,
        grant_type: "authorization_code",
        redirect_uri:
          "https://cafe24-webhook-test.herokuapp.com/cafe24/accesstoken",
      },
    },
  }).catch((e) => {
    console.error("ERROR get-token", e);
  });
  //   axios
  //     .post(
  //       url,
  //       {
  //         code: authcode,
  //         grant_type: "authorization_code",
  //         redirect_uri:
  //           "https://cafe24-webhook-test.herokuapp.com/cafe24/accesstoken",
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //           Authorization: `Basic ${Buffer.from(
  //             process.env.CAFE24_CLIENT_ID +
  //               ":" +
  //               process.env.CAFE24_CLIENT_SECRET
  //           ).toString("base64")}`,
  //         },
  //       }
  //     )
  //     .catch((e) => {
  //       console.error("ERROR get-token", e);
  //     });

  //   const auth = Buffer.from(
  //     process.env.CAFE24_CLIENT_ID + ":" + process.env.CAFE24_CLIENT_SECRET
  //   ).toString("base64");

  //   console.log("AUTH:", auth);
};
