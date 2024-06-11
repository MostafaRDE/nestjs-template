import { Column, DataType, Table } from 'sequelize-typescript'
import { BaseSequelizeModel } from '../base.sequelize.model'

@Table({ tableName: 'accounts' })
export default class AccountSequelizeModel extends BaseSequelizeModel<AccountSequelizeModel, AccountSequelizeModel>
{
    @Column({ field: 'nickname', type: DataType.STRING(64), allowNull: false, unique: true })
    nickname: string
}
