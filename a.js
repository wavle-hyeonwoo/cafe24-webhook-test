const fetch = require("node-fetch");
const qs = require("querystring");
const { URLSearchParams } = require("url");
const { default: axios } = require("axios");

const run = async (authcode) => {
  const url = `http://localhost:3001`;
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
    .catch((e) => {
      console.error("ERROR get-token", e);
    });
};

run("abcd");
