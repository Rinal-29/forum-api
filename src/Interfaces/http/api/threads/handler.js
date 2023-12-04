const AddThreadCommentUseCase = require('../../../../Applications/use_case/threads/AddThreadCommentUseCase');
const AddThreadUseCase =  require('../../../../Applications/use_case/threads/AddThreadUseCase');
const DeleteThreadCommentUseCase = require('../../../../Applications/use_case/threads/DeleteThreadCommentUseCase');
const GetAllThreadCommentUseCase = require('../../../../Applications/use_case/threads/GetAllThreadCommentUseCase');

class ThreadsHandler{
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.postThreadCommentHandler = this.postThreadCommentHandler.bind(this);
    this.deleteThreadCommentHandler = this.deleteThreadCommentHandler.bind(this);
    this.getAllThreadCommentHandler = this.getAllThreadCommentHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const { id: ownerId } = request.auth.credentials;
    const addThreadUseCase =  this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute(request.payload, ownerId);

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      }
    });
    response.code(201);
    return response;
  }

  async postThreadCommentHandler(request, h) {
    const { id: ownerId } = request.auth.credentials;
    const { threadId } = request.params;
    const addThreadCommentUseCase = this._container.getInstance(AddThreadCommentUseCase.name);
    const addedComment = await addThreadCommentUseCase.execute(request.payload, threadId, ownerId);

    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      }
    });
    response.code(201);
    return response
  }

  async deleteThreadCommentHandler(request, h) {
    const { id: ownerId } = request.auth.credentials;
    const { threadId, commentId } = request.params;
    const deleteThreadCommentUseCase = this._container.getInstance(DeleteThreadCommentUseCase.name);
    await deleteThreadCommentUseCase.execute(ownerId, threadId, commentId);

    const response = h.response({
      status: 'success'
    });
    return response;
  }

  async getAllThreadCommentHandler(request, h) {
    const { threadId } = request.params;
    const getAllThreadCommentUseCase = this._container.getInstance(GetAllThreadCommentUseCase.name);
    const data = await getAllThreadCommentUseCase.execute(threadId);

    const response = h.response({
      status: 'success',
      data
    });
    return response;
  }
}

module.exports = ThreadsHandler;