const AddThreadRequest = require('../../../Domains/threads/entities/AddThreadRequest');

class AddThreadUseCase {
  constructor({threadRepository}) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload, owner) {
    const request = new AddThreadRequest(useCasePayload);
    return this._threadRepository.addThread(request.title, request.body, owner);
  }
}

module.exports = AddThreadUseCase;