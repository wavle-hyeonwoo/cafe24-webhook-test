const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/webhook", (req, res, next) => {
  console.log("[HOOK]\n", req.body, "\n\n\n");
  res.json({ code: 0 });
});

app.listen(app.get("port"), () => {
  console.log("Listen at ", app.get("port"));
});
