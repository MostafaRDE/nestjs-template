const sequelize = {
    host: process.env.DB_MYSQL_HOST || 'localhost',
    port: +process.env.DB_MYSQL_PORT || 3306,
    username: process.env.DB_MYSQL_USERNAME || 'root',
    password: process.env.DB_MYSQL_PASSWORD || 'secret',
    database: process.env.DB_MYSQL_DATABASE || 'test',
    pool: {
        evict: +process.env.DB_MYSQL_POOL_EVICT || 0,
        idle: +process.env.DB_MYSQL_POOL_IDLE || 10_000,
        min: +process.env.DB_MYSQL_POOL_MIN || 0,
        max: +process.env.DB_MYSQL_POOL_MAX || 5,
        maxUses: +process.env.DB_MYSQL_POOL_MAX_USES || 0,
    },
}

export default {
    sequelize,
}
