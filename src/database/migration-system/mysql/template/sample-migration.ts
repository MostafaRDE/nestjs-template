import type { SequelizeMigrationRunnerUmzugBasePackage } from '../umzug'

// you can put some team-specific imports/code here to be included in every migration

export const up: SequelizeMigrationRunnerUmzugBasePackage = async ({ context: sequelize }) =>
{
    await sequelize.query('raise fail(\'up migration not implemented\')')
}

export const down: SequelizeMigrationRunnerUmzugBasePackage = async ({ context: sequelize }) =>
{
    await sequelize.query('raise fail(\'down migration not implemented\')')
}
