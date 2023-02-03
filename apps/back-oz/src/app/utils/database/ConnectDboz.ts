import knex from 'knex';

const knexConnector = knex({
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'root',
      password : 'password',
      database : 'Dboz'
    }
  });

export const getConnector=() => knexConnector;