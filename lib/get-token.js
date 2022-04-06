const { default: axios } = require("axios");
const fetch = require("node-fetch");
const qs = require("querystring");
const { URLSearchParams } = require("url");

module.exports = async function (authcode) {
  const url = `https://clubpetworld.cafe24api.com/api/v2/oauth/token`;
  const params = new URLSearchParams();
  params.append("code", authcode);
  params.append("grant_type", "authorization_code");
  params.append(
    "redirect_uri",
    "https://cafe24-webhook-test.herokuapp.com/cafe24/accesstoken"
  );

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        process.env.CAFE24_CLIENT_ID + ":" + process.env.CAFE24_CLIENT_SECRET
      ).toString("base64")}`,
      body: params,
    },
  });
  console.log("[RESPONSE]\n", await response.json());
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
