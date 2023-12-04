/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns('thread_comments', {
    is_delete: {
      type: 'BOOLEAN',
      notNull: true,
      default: false,
    }
  });
};

exports.down = (pgm) => {
  pgm.dropColumns('thread_comments', 'is_delete');
};
