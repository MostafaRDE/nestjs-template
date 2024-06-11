import { DataType } from 'sequelize-typescript'

export const ForeignColumnSequelizeModelTypeObject = (tableName: string, options?: { field?: string, targetKey?: string, allowNull?: boolean }) => ({
    field: options?.field,
    type: DataType.BIGINT({ unsigned: true }),
    allowNull: Reflect.has(options || {}, 'allowNull') && options.allowNull,
    references: { key: options?.targetKey || 'Id', model: tableName },
})