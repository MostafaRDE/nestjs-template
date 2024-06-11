import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import AccountSequelizeModel from '../../database/sequelize/models/account.sequelize.model'
import { AccountModelInterface } from './models/account.model.interface'

@Injectable()
export class AccountsService
{
    constructor(
        @InjectModel(AccountSequelizeModel)
        private readonly accountSequelizeModel: typeof AccountSequelizeModel,
    ) {}

    async get(accountId: number): Promise<AccountModelInterface>
    {
        let account = await this.accountSequelizeModel.findByPk(accountId)
        if (!account)
            throw new InternalServerErrorException()

        account = account.toJSON()

        return { nickname: account.nickname }
    }
}