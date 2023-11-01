const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const InvariantError = require('../../Commons/exceptions/InvariantError');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, nanoId) {
    super();
    this._pool = pool;
    this._nanoId = nanoId;
  }

  async addThread(title, body, owner) {
    const id = `thread-${this._nanoId(16)}`;

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, title, body, owner]
    };

    const result = await this._pool.query(query);

    if (result.rows[0].id) throw new InvariantError('Thread gagal ditambahkan');

    return result.rows[0].id;
  }
}

module.exports = ThreadRepositoryPostgres;