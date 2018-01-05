exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del().then(function() {
    // Inserts seed entries
    return knex('users').insert([
      {
        id: 1,
        email: 'gena.catharine@gmail.com',
        hashed_password: 'dummypassword'
      }
    ]).then(() => {
    return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
  })
})
}