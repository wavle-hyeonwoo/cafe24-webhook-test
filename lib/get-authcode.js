const { default: axios } = require("axios");

module.exports = async function () {
  const url = `https://clubpetworld.cafe24api.com/api/v2/oauth/authorize`;

  const result = await axios.get(url, {
    params: {
      response_type: "code",
      client_id: process.env.CAFE24_CLIENT_ID,
      state: `asdfadsfasdfasdfasdfadsf`,
      redirect_uri: `https://cafe24-webhook-test.herokuapp.com/cafe24/authcode`,
      scope: `mall.read_application`,
    },
  });

  console.log("[REQUEST]\n", result.request);
  console.log("[RESULT]\n", result.data);
};
