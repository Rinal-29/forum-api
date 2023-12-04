class GetAllThreadCommentHandler {
  constructor({threadRepository}) {
    this._threadRepository = threadRepository;
  }

  async execute(threadId) {
    const thread = await this._threadRepository.getThreadById(threadId);
    const comments = await this._threadRepository.getAllThreadcomment(threadId);
    comments.sort((a, b) => {
      const aVal = new Date(a.date);
      const bVal = new Date(b.date);
      return aVal - bVal;
    });
    return { 
      thread: {
        ...thread, 
        comments
      } 
    };
  }
}

module.exports = GetAllThreadCommentHandler;