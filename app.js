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
  const query = `?start_date=2022-03-01&end_date=2022-04-08`;
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.CAFE24_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      "X-Cafe24-Api-Version": "2022-03-01",
    },
  };
  try {
    const response = await axios.get(baseUrl + query, config);
    res.json(response.data);
  } catch (e) {
    res.json({
      result: "ERROR",
      error: e,
    });
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
