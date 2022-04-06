const express = require("express");
const app = express();

const getAuthcode = require("./lib/get-authcode");

app.set("port", process.env.PORT || 3000);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/webhook", (req, res, next) => {
  console.log("[HOOK]\n", req.body, "\n\n\n");
  getAuthcode();
  res.json({ code: 0 });
});

app.get("/cafe24/authcode", (req, res, next) => {
  console.log("QUERY: ", req.query);
  getAccessToken(req.query.code);
  res.json({ code: 0 });
});

app.post("/cafe24/accesstoken", (req, res, next) => {
  console.log("ACCESS_TOKEN: \n\n\n\n", req.body);
  res.json({ code: 0 });
});

app.listen(app.get("port"), () => {
  console.log("Listen at ", app.get("port"));
});
