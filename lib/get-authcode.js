const { default: axios } = require("axios");

module.exports = async function () {
  const url = `https://clubpetworld.cafe24api.com/api/v2/oauth/authorize`;
  const result = await axios.post(
    url,
    {
      response_type: "code",
      client_id: process.env.clientId,
      state: `asdfadsfasdfasdfasdfadsf`,
      redirect_uri: `https://cafe24-webhook-test.herokuapp.com/cafe24/authcode`,
      scope: `mall.read_application`,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  console.log("[RESULT]\n", result.data);
};
