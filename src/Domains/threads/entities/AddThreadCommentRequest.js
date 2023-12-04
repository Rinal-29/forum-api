class AddThreadCommentRequest {
  constructor(payload) {
    this._verifyPayload(payload);

    this.content = payload.content;
  }

  _verifyPayload(payload) {
    const { content } = payload;

    if (!content || typeof content !== 'string') {
      throw new Error('THREAD_COMMENT.CONTENT_NOT_VALID');
    }
  }
}

module.exports = AddThreadCommentRequest;