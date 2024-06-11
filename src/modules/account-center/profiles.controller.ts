import { Controller, Get, InternalServerErrorException } from '@nestjs/common'
import { ClsService } from 'nestjs-cls'
import { CURRENT_USER } from '../../constants'
import { AccountsService } from './accounts.service'
import { ProfileModelInterface } from './models/profile.model'

@Controller('account-center/profile')
export class ProfilesController
{
    constructor(
        private readonly clsService: ClsService,
        private readonly accountsService: AccountsService,
    ) {}

    @Get()
    async get(): Promise<ProfileModelInterface>
    {
        const accountId = this.clsService.get<number>(CURRENT_USER)
        if (!accountId)
            throw new InternalServerErrorException()

        const account = await this.accountsService.get(accountId)
        return { ...account }
    }
}
