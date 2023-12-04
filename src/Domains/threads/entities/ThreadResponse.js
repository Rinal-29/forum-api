class ThreadResponse {
  constructor({ id, title, body, date, username }) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.date = date;
    this.username = username;
  }
}

module.exports = ThreadResponse;