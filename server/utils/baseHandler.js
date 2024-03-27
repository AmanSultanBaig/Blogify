class BaseHandler {
  response(res, data) {
    const { status, message, rows } = data;

    if (status === 200) {
      return res.status(status).json({ message, data: rows });
    } else {
      return res.status(status).json({ message });
    }
  }
}

module.exports = BaseHandler;
