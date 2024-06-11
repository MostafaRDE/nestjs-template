import Sequelize, { ModelAttributeColumnOptions } from 'sequelize'

export const IdColumnSequelizeMigrationKey = {
    id: { type: Sequelize.BIGINT({ unsigned: true }), primaryKey: true, autoIncrement: true },
}

export const ForeignColumnSequelizeMigrationKey = (tableName: string, options?: { targetKey?: string, allowNull?: boolean }) => ({
    type: Sequelize.BIGINT({ unsigned: true }),
    allowNull: Reflect.has(options || {}, 'allowNull') && options.allowNull,
    references: { key: options?.targetKey || 'id', model: tableName },
} as ModelAttributeColumnOptions)