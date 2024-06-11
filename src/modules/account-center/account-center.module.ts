import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import AccountSequelizeModel from '../../database/sequelize/models/account.sequelize.model'
import { AccountsService } from './accounts.service'
import { ProfilesController } from './profiles.controller'

@Module({
    imports: [
        SequelizeModule.forFeature([ AccountSequelizeModel ]),
    ],
    controllers: [ ProfilesController ],
    providers: [ AccountsService ],
})
export class AccountCenterModule {}
