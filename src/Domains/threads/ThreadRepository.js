class ThreadRepository {
  async addThread(title, body, owner) {
    throw new Error('THREAD_REPOSITORY.METHOD_ADD_NOT_IMPLEMENTED');
  }
  async getThreadById(threadId) {
    throw new Error('THREAD_REPOSITORY.METHOD_GET_NOT_IMPLEMENTED');
  }
  async verifyThreadCommentOwner(commentId, ownerId) {
    throw new Error('THREAD_REPOSITORY.METHOD_VERIFY_NOT_IMPLEMENTED');
  }
  async addThreadComment(conntet, threadId, ownerId) {
    throw new Error('THREAD_REPOSITORY.METHOD_ADD_NOT_IMPLEMENTED');
  }
  async getAllThreadcomment(threadId) {
    throw new Error('THREAD_REPOSITORY.METHOD_GET_NOT_IMPLEMENTED');
  }
  async DeleteThreadCommentByOwner(commentId, ownerId) {
    throw new Error('THREAD_REPOSITORY.METHOD_DELETE_NOT_IMPLEMENTED');
  }
}

module.exports = ThreadRepository;