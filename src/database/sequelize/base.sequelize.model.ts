import { InferAttributes } from 'sequelize'
import { Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt } from 'sequelize-typescript'
import { sequelizeDefaultScope, sequelizeScopes } from './scopes'

type InferAttributesRecordBaseSequelizeModel = InferAttributes<BaseSequelizeModel>

@Table({ defaultScope: sequelizeDefaultScope, scopes: sequelizeScopes, paranoid: true })
export abstract class BaseSequelizeModel<
    TModelAttributes extends object = InferAttributesRecordBaseSequelizeModel,
    TCreationAttributes extends object = TModelAttributes
>
    extends Model<TModelAttributes, TCreationAttributes>
{
    @Column({ field: 'id', type: DataType.BIGINT({ unsigned: true }), primaryKey: true, autoIncrement: true })
    id: number

    @Column({ field: 'guid', type: DataType.UUID, defaultValue: DataType.UUIDV4, allowNull: true, unique: true })
    guid?: string

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date

    @UpdatedAt
    @Column({ field: 'updated_at', allowNull: true })
    updatedAt?: Date

    @DeletedAt
    @Column({ field: 'deleted_at', allowNull: true })
    deletedAt?: Date
}
