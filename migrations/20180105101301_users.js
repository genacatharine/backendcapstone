exports.up = function(knex, Promise) {
return knex.schema.createTable('users', function(table){
  table.increments()
  table.varchar('email', 255).notNullable()
  table.specificType('hashed_password', 'CHAR(60)').notNullable()
  table.timestamps(true, true)
});

}
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
