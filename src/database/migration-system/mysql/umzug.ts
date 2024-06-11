import '../../../config-extra'

import { ConfigService } from '@nestjs/config'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { Sequelize } from 'sequelize'
import { SequelizeStorage, Umzug } from 'umzug'

const configService = new ConfigService({ database: { mysql: {
    host: process.env.DB_MYSQL_HOST || 'localhost',
    port: Number.parseInt(process.env.DB_MYSQL_PORT || '3306'),
    username: process.env.DB_MYSQL_USERNAME || 'root',
    password: process.env.DB_MYSQL_PASSWORD || 'root',
    database: process.env.DB_MYSQL_DATABASE || 'test',
    logging: false, // process.env.NODE_ENV !== 'production' && ((...messages: unknown[]) => console.log(...messages)),
    autoLoadModels: false,
    synchronize: false,
} } })

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: configService.get('database.mysql.host'),
    port: +(configService.get<number>('database.mysql.port') || 3306),
    username: configService.get('database.mysql.username'),
    password: configService.get('database.mysql.password'),
    database: configService.get('database.mysql.database'),
    logging: configService.get<boolean>('database.mysql.logging'),
})

export const migrator = new Umzug({
    migrations: {
        glob: [ 'migrations/*.js', { cwd: __dirname } ],
    },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
    create: {
        folder: 'src/database/migration-system/mysql/migrations',
        template: filepath => [
            // read template from filesystem
            [ filepath, fs.readFileSync(path.join(__dirname, 'template/sample-migration.ts')).toString() ],
        ],
    },
})

export type SequelizeMigrationRunnerUmzugBasePackage = typeof migrator._types.migration