//config.js
module.exports = {
  facebook_key: "326941076106354", //Điền App ID của bạn vào đây
  facebook_secret: "8e4080d2c4367363149914c344b8adf0", //Điền App Secret ở đây
  callback_url: "http://localhost:5000/auth/facebook/callback",
  profileFields: [
    "id",
    "displayName",
    "email",
    "first_name",
    "last_name",
    "middle_name",
  ],
};
