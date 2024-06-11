import Sequelize from 'sequelize'
import { BaseSequelizeMigrationKeys } from '../base/base.sequelize.migration'
import { IdColumnSequelizeMigrationKey } from '../base/id.column.sequelize.migration'
import type { SequelizeMigrationRunnerUmzugBasePackage } from '../umzug'

const TABLE_NAME = 'courses'

export const up: SequelizeMigrationRunnerUmzugBasePackage = async ({ context }) =>
{
    await context.getQueryInterface().createTable(TABLE_NAME, {
        ...IdColumnSequelizeMigrationKey,
        ...BaseSequelizeMigrationKeys,
        title: { type: Sequelize.STRING(128), allowNull: false, unique: true },
        summary: { type: Sequelize.TEXT('medium'), allowNull: true },
        description_ctx: { type: Sequelize.JSON, allowNull: false },
    }, { charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' })
}

export const down: SequelizeMigrationRunnerUmzugBasePackage = async ({ context }) =>
{
    await context.getQueryInterface().dropTable(TABLE_NAME)
}
