exports.home = (req, res) => {
  const datas = [];
  res.send("hello");
};
exports.about = (req, res) => {
  res.sendFile(__dirname.replace("03\\controllers", "") + "03/index.html");
};
