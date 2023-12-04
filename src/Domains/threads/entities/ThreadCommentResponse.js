class ThreadCommentResponse{
  constructor({ id, username, date, content }) {
    this.id = id;
    this.username = username;
    this.date = date;
    this.content = content;
  }
}

module.exports = ThreadCommentResponse;