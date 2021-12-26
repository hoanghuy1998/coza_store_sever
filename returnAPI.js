exports.payload = (res, payload) => {
  if (!payload) {
    res.status("404").json({
      errorCode: 404,
      errorMessage: "not Found",
    });
  } else if (payload.code) {
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
        break;
    }
  } else {
    res.status("200").json({
      errorCode: 0,
      data: payload,
    });
  }
};
exports.convertSrc = (a) => {
  a.forEach((a) => {
    a.srcImg = `http://localhost:5000/data/${a.srcImg}`;
  });
};
exports.parse = (a) => {
  a.forEach((a) => {
    if (a.type) a.type = JSON.parse(a.type);
    if (a.status) a.status = JSON.parse(a.status);
    if (a.contents) a.contents = JSON.parse(a.contents);
    if (a.taps) a.taps = JSON.parse(a.taps);
  });
};
exports.stringify = (a) => {
  a.forEach((a) => {
    if (a.type) a.type = JSON.stringify(a.type);
    if (a.status) a.status = JSON.stringify(a.status);
    if (a.contents) a.contents = JSON.stringify(a.contents);
    if (a.taps) a.taps = JSON.stringify(a.taps);
  });
};
exports.getDate = () => {
  const today = new Date();
  return (
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
  );
};
