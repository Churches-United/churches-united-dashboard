const pg = require('pg');
let pool;


// When our app is deployed to the internet, we'll use the
// DATABASE_URL environment variable to set the connection info.
if (process.env.DATABASE_URL) {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
}
// When we're running this app on our own computer we'll connect to the
// postgres database that is also running on localhost:5432.
else {
  pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'cu_dashboard',
  });
}
pool.on('connect', () => console.log(`Connected to database`));
pool.on('error', (err) => console.error(`Error connecting to database:`, err));

module.exports = pool;
