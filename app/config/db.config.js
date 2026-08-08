/* module.exports = {
    HOST:  'ep-lucky-pond-au5utpc3-pooler.c-10.us-east-1.aws.neon.tech',    
    USER: 'neondb_owner',
    PASSWORD: 'npg_7AsU5tWpbaDB',
    DB:'neondb',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
 */

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || "postgres",
  // DB_SSL viene como texto ("true"/"false") desde el .env; lo convertimos a booleano real
  ssl: process.env.DB_SSL === "true",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};