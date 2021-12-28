exports.payload = (res, payload) => {
  if (!payload) {
    console.log("do khoong");
    res.status("404").json({
      errorCode: 404,
      errorMessage: "not Found",
    });
  } else if (payload.code) {
    console.log("do code");
    switch (parseInt(payload.code)) {
      case 303:
        res.status("303").json({
          errorCode: 303,
          errorMessage: "See Other",
        });
        break;
      case 400:
        res.status("400").json({
          errorCode: 400,
          errorMessage: "Bad Request",
        });
        break;
      case 401:
        res.status("401").json({
          errorCode: 401,
          errorMessage: "Unauthorized",
        });
        break;
      case 405:
        res.status("405").json({
          errorCode: 405,
          errorMessage: "Method Not Allowed",
        });
        break;
      case 406:
        res.status("406").json({
          errorCode: 406,
          errorMessage: "Not Acceptable",
        });
        break;
      default:
        res.status("400").json({
          errorCode: payload.code,
          errorMessage: payload.message,
        });
        break;
    }
  } else {
    console.log("do data");
    res.status("200").json({
      errorCode: 0,
      data: payload,
    });
  }
};
exports.convertSrc = (a) => {
  a.forEach((a) => {
    a.srcImg = `http://localhost:5000/data/${a.srcImg}`;
    // a.srcImg = `https://hoanghuy1998.herokuapp.com/data/${a.srcImg}`;
  });
};
exports.parse = (a) => {
  a.forEach((a) => {
    if (a.type) a.type = JSON.parse(a.type);
    if (a.status) a.status = JSON.parse(a.status);
    if (a.contents) a.contents = JSON.parse(a.contents);
    if (a.taps) a.taps = JSON.parse(a.taps);
    if (a.details) a.details = JSON.parse(a.details);
  });
};
exports.stringify = (a) => {
  a.forEach((a) => {
    if (a.type) a.type = JSON.stringify(a.type);
    if (a.status) a.status = JSON.stringify(a.status);
    if (a.contents) a.contents = JSON.stringify(a.contents);
    if (a.taps) a.taps = JSON.stringify(a.taps);
    if (a.details) a.details = JSON.stringify(a.details);
  });
};
exports.getDate = () => {
  const today = new Date();
  return (
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    "-" +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds()
  );
};
// {
// "customerName": "fdsfad",
// "address": "fdafsd",
// "phone": "fdfasd",
// "city": "ddafd",
// "ward":"fas",
// "city": "dfsaf,
// details: [
// {id: 12, quantity: 2, price: 100000},
// {id: 13, quantity: 1, price: 50000},
// {id: 14, quantity: 4, price: 10000},
// ]
// }
