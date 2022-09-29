/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("experiences", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    period: {
      type: "TEXT",
      notNull: true,
    },
    position: {
      type: "TEXT",
      notNull: true,
    },
    description: {
      type: "TEXT",
      notNull: true,
    },
    created_at: {
      type: "TEXT",
      notNull: true,
    },
    updated_at: {
      type: "TEXT",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("experiences");
};
