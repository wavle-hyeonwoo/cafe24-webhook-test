const { default: axios } = require("axios");
const express = require("express");
const app = express();
//
const getAccessToken = require("./lib/get-token");

app.set("port", process.env.PORT || 3000);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res, next) => {
  const baseUrl = "https://clubpetworld.cafe24api.com/api/v2/admin/orders";
  const query = `?`;
  const config = {
    hedaers: {
      Authorization: "Bearer gWwMy4ngFhShzIjfEsQUEE",
      "Content-Type": "application/json",
      "X-Cafe24-Api-Version": "2022-03-01",
    },
  };
  axios
    .get(baseUrl + query, config)
    .then((res) => {
      res.json(res.data);
    })
    .catch((e) => {
      res.json({
        result: "ERROR",
        error: e,
      });
    });
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
