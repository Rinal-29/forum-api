class DeleteThreadCommentUseCase{
  constructor({threadRepository}) {
    this._threadRepository = threadRepository
  }

  async execute(ownerId, threadId, commentId) {
    await this._threadRepository.getThreadById(threadId);
    await this._threadRepository.verifyThreadCommentOwner(commentId, ownerId);
    await this._threadRepository.DeleteThreadCommentByOwner(commentId, ownerId);
  }
}

module.exports = DeleteThreadCommentUseCase;