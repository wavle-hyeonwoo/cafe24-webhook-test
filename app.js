const { default: axios } = require("axios");
const express = require("express");
const app = express();
const qs = require("querystring");
//
const getAccessToken = require("./lib/get-token");

app.set("port", process.env.PORT || 3000);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res, next) => {
  const baseUrl = "https://clubpetworld.cafe24api.com/api/v2/admin/orders";
  const query = `?`;
  const config = {
    headers: {
      Authorization: "Bearer gWwMy4ngFhShzIjfEsQUEE",
      "Content-Type": "application/json",
      "X-Cafe24-Api-Version": "2022-03-01",
    },
  };
  try {
    const response = await axios.get(baseUrl + query, config);
    res.json(response.data);
  } catch (e) {
    console.error("ERROR Occured. It seems that a access token has expired.");
    const refreshResult = await axios.post(
      `https://clubpetworld.cafe24api.com/api/v2/oauth/token`,
      qs.stringify({
        grant_type: "refresh_token",
        refresh_token: "XqmIe08ICSWVFxTzjIIZfP",
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.CAFE24_CLIENT_ID +
              ":" +
              process.env.CAFE24_CLIENT_SECRET
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    config.headers[
      "Authorization"
    ] = `Bearer ${refreshResult.data.access_token}`;

    const response = await axios.get(baseUrl + query, config);
    console.log("#1");
    res.json(response.data);
  }
});

app.post("/webhook", (req, res, next) => {
  console.log("[HOOK]\n", req.body, "\n\n\n");
  res.json({ code: 0 });
});

app.get("/cafe24/authcode", (req, res, next) => {
  console.log("QUERY: ", req.query.code);
  getAccessToken(req.query.code);
  res.json({ code: 0 });
});

// app.post("/cafe24/accesstoken", (req, res, next) => {
//   console.log("ACCESS_TOKEN: \n\n\n\n", req.query);
//   res.json({ code: 0 });
// });

app.listen(app.get("port"), () => {
  console.log("Listen at ", app.get("port"));
});
