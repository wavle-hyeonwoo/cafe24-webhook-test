const qs = require("querystring");

// console.log(
//   qs.encode({
//     response_type: "code",
//     client_id: process.env.CAFE24_CLIENT_ID,
//     state: `asdfadsfasdfasdfasdfadsf`,
//     redirect_uri: `https://cafe24-webhook-test.herokuapp.com/cafe24/authcode`,
//     scope: `mall.read_application`,
//   })
// );

console.log(
  qs.encode({
    code: "1234",
    grant_type: "authorization_code",
    redirect_uri:
      "https://cafe24-webhook-test.herokuapp.com/cafe24/accesstoken",
  })
);
