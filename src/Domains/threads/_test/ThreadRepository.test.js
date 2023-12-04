const ThreadRepository = require('../ThreadRepository');

describe('ThreadRepository interface', () => {
  it('Should throw error when invoke unimplemented method', async () => {
    // Arrange
    const threadRepository = new ThreadRepository();

    // Action & assert
    await expect(threadRepository.addThread('', '', '')).rejects.toThrowError('THREAD_REPOSITORY.METHOD_ADD_NOT_IMPLEMENTED');
  });
});