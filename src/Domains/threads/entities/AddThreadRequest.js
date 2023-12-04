class AddThreadRequest {
  constructor(payload) {
    this._verifyPayload(payload);

    const { title, body } = payload;

    this.title = title;
    this.body = body;
  }

  _verifyPayload({ title, body }) {
    if (!title || !body) {
      throw new Error('THREAD_REQUEST.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof title != 'string' || typeof body !== 'string') {
      throw new Error('THREAD_REQUEST.INPUT_TYPE_NOT_STRING');
    }
  }
}

module.exports = AddThreadRequest;