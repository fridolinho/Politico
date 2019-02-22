import pool from './connect';

const deleteTables = () => {
  const users = 'DROP TABLE IF EXISTS users CASCADE';
  const offices = 'DROP TABLE IF EXISTS office CASCADE';
  const parties = 'DROP TABLE IF EXISTS party CASCADE';
  const candidates = 'DROP TABLE IF EXISTS candidate';
  const votes = 'DROP TABLE IF EXISTS vote';
  const petitions = 'DROP TABLE IF EXISTS petition';


  const dropQueries = `${petitions}; ${votes}; ${candidates}; ${offices}; ${parties}; ${users};`;

  pool.query(dropQueries)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
};

const createTables = () => {
  const users = `CREATE TABLE IF NOT EXISTS
     users(
       id SERIAL PRIMARY KEY,
       "firstName" VARCHAR(50) NOT NULL,
       "lastName" VARCHAR(50) NOT NULL,
       "otherName" VARCHAR(50) NULL,
       email VARCHAR(100) NOT NULL,
       "phoneNumber" VARCHAR(15) NOT NULL,
       password TEXT NOT NULL,
       "passportUrl" VARCHAR(50) NOT NULL,
       "isAdmin" BOOLEAN NOT NULL DEFAULT false
     )`;

  const parties = `CREATE TABLE IF NOT EXISTS
    party(
     id SERIAL PRIMARY KEY,
     name VARCHAR(50) NOT NULL,
     "hqAddress" VARCHAR(50) NOT NULL,
     "logoUrl" VARCHAR(50) NOT NULL
    )`;
  const offices = `CREATE TABLE IF NOT EXISTS
    office(
     id SERIAL PRIMARY KEY,
     name VARCHAR(50) NOT NULL,
     type VARCHAR(50) NOT NULL
    )`;

  const candidates = `CREATE TABLE IF NOT EXISTS
   candidate(
     id SERIAL,
     office INT NOT NULL REFERENCES office(id) ON DELETE CASCADE ON UPDATE CASCADE,
     party INT NOT NULL REFERENCES party(id) ON DELETE CASCADE ON UPDATE CASCADE,
     candidate INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
     votes INT NOT NULL DEFAULT 0,
     PRIMARY KEY (id, office, candidate)
   )`;

  const votes = `CREATE TABLE IF NOT EXISTS
  vote(
     id SERIAL PRIMARY KEY,
     "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
     "createdBy" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
     office INT NOT NULL REFERENCES office(id) ON DELETE CASCADE ON UPDATE CASCADE,
     candidate INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
  )`;

  const petitions = `CREATE TABLE IF NOT EXISTS
  petition(
     id SERIAL PRIMARY KEY,
     "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
     "createdBy" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
     office INT NOT NULL REFERENCES office(id) ON DELETE CASCADE ON UPDATE CASCADE,
     body TEXT NOT NULL
  )`;

  const queries = `${users}; ${offices}; ${parties}; ${candidates}; ${votes}; ${petitions}`;

  pool.query(queries)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
};

const truncateUsers = () => {
  const users = `TRUNCATE users CASCADE;
                    ALTER SEQUENCE users_id_seq RESTART WITH 1;  
                    `;
  const office = `TRUNCATE office CASCADE;
                    ALTER SEQUENCE office_id_seq RESTART WITH 1;  
                    `;
  const party = `TRUNCATE party CASCADE;
                    ALTER SEQUENCE party_id_seq RESTART WITH 1;  
                    `;
  const petition = `TRUNCATE petition CASCADE;
                    ALTER SEQUENCE petition_id_seq RESTART WITH 1;  
                    `;
  const candidate = `TRUNCATE candidate CASCADE;
                    ALTER SEQUENCE candidate_id_seq RESTART WITH 1;  
                    `;
  const vote = `TRUNCATE vote CASCADE;
                    ALTER SEQUENCE vote_id_seq RESTART WITH 1;  
                    `;
  const deleteQueries = `${users}; ${office}; ${party}; ${candidate}; ${vote}; ${petition}`;
  pool.query(deleteQueries)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
};

module.exports = {
  createTables,
  deleteTables,
  truncateUsers,
};

require('make-runnable');
