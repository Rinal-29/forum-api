/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns('threads', {
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    }
  });

  pgm.addColumns('thread_comments', {
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    }
  });
};

exports.down = (pgm) => {
  pgm.dropColumns('threads', 'createdAt');
  pgm.dropColumns('thread_comments', 'createdAt');
};
