class BaseHandler {
  response(res, response) {
    const { status = 200, message, data } = response;

    if (status === 200) {
      return res.status(status).json({ message, data });
    } else {
      return res.status(status).json({ message });
    }
  }
}

module.exports = BaseHandler;
