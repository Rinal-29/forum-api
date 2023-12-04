const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const ThreadResponse = require('../../Domains/threads/entities/ThreadResponse');
const ThreadCommentResponse = require('../../Domains/threads/entities/ThreadCommentResponse');

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
    if (!result.rows[0].id) throw new InvariantError('Thread gagal ditambahkan');
    return { id, title, owner };
  }

  async getThreadById(threadId) {
    const query = {
      text: `SELECT threads.*, users.username from threads
      LEFT JOIN users ON users.id = threads.owner
      WHERE threads.id = $1
      `,
      values: [threadId]
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Thread tidak ditemukan');
    }
    return new ThreadResponse({ ...result.rows[0], date: result.rows[0].createdAt });
  }

  async verifyThreadCommentOwner(commentId, ownerId) {
    const query = {
      text: 'SELECT * FROM thread_comments WHERE id = $1',
      values: [commentId],
    }

    const result = await this._pool.query(query);
    if (!result.rowCount) throw new NotFoundError('Comment tidak ditemukan/valid');

    if (result.rows[0].owner_id !== ownerId) {
      throw new AuthorizationError('Anda tidak berhak mengakses comment');
    }
  }

  async addThreadComment(content, threadId, ownerId) {
    const id = `comment-${this._nanoId(16)}`;

    const query = {
      text: 'INSERT INTO thread_comments VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, content, threadId, ownerId],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) throw new InvariantError('Comment gagal ditambahkan');
    return { id, content, owner: ownerId };
  }

  async getAllThreadcomment(threadId) {
    const query = {
      text: `SELECT thread_comments.*, users.username FROM thread_comments
      LEFT JOIN users ON users.id = thread_comments.owner_id
      WHERE thread_comments.thread_id = $1
      `,
      values: [threadId]
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) return [];
    return result.rows.map(item => new ThreadCommentResponse({...item, date: item.createdAt}));
  }
  
  async DeleteThreadCommentByOwner(commentId, ownerId) {
    const content = "**komentar telah dihapus**";
    const query = {
      text: 'UPDATE thread_comments SET is_delete = $1, content = $2 WHERE id = $3 AND owner_id = $4 RETURNING is_delete',
      values: [true, content, commentId, ownerId]
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].is_delete) throw new InvariantError('Gagal menghapus data');
  }
}

module.exports = ThreadRepositoryPostgres;