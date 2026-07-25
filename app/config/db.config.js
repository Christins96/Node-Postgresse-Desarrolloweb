module.exports = {
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
