const mysql = require('mysql2/promise');

const createConnectionPool = () => {
  const pool = mysql.createPool({
    host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    user: 'bsale_test',
    password: 'bsale_test',
    database: 'airline',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  pool.getConnection().then(connection => {
    console.log('Connected to MySQL database');
    connection.release();
  }).catch(error => {
    console.error('Error connecting to MySQL:', error);
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Attempting to reconnect...');
      setTimeout(() => createConnectionPool(), 2000);
    }
  });

  pool.on('error', (error) => {
    console.error('Fatal error occurred:', error);
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Attempting to reconnect...');
      createConnectionPool();
    }
  });

  return pool;
};

const pool = createConnectionPool();

module.exports = pool;

