/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('thread_comments', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    content: {
      type: 'VARCHAR(250)',
      notNull: true
    },
    thread_id: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    owner_id: {
      type: 'VARCHAR(50)',
      notNull: true
    }
  });

  pgm.addConstraint('thread_comments', 'fk_thread_comments.thread_id_threads.id', 'FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE');
  pgm.addConstraint('thread_comments', 'fk_thread_comments.owner_id_users.id', 'FOREIGN KEY(owner_id) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('thread_comments');
};
