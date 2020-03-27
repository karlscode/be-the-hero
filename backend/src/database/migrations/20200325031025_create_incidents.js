
exports.up = function (knex) { // eslint-disable-line func-names
  return knex.schema.createTable('incidents', (table) => {
    table.increments();

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ong_id').notNullable();

    table.foreign('ong_id').references('id').inTable('ongs');
  });
};

exports.down = function (knex) { // eslint-disable-line func-names
  return knex.schema.dropTable('incidents');
};
