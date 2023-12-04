const AddThreadCommentRequest = require('../../../Domains/threads/entities/AddThreadCommentRequest');

class AddThreadCommentUseCase {
  constructor({threadRepository}) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload, threadId, ownerId) {
    const request = new AddThreadCommentRequest(useCasePayload)
    const thread = await this._threadRepository.getThreadById(threadId);
    console.log(thread);
    return this._threadRepository.addThreadComment(request.content, thread.id, ownerId);
  }
}

module.exports = AddThreadCommentUseCase;