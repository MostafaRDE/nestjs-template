import { Test } from '@nestjs/testing'
import { AccountsService } from './accounts.service'
import { getModelToken } from '@nestjs/sequelize'
import AccountSequelizeModel from '../../database/sequelize/models/account.sequelize.model'

describe('AccountsService', () =>
{
    let accountsService: AccountsService

    beforeAll(async () =>
    {
        const moduleReference = await Test.createTestingModule({
            providers: [
                AccountsService,
                {
                    provide: getModelToken(AccountSequelizeModel),
                    useValue: { findByPk: jest.fn(() => ({
                        toJSON: jest.fn(() => ({ nickname: 'test-name' })),
                    })) },
                },
            ],
        }).compile()

        accountsService = moduleReference.get(AccountsService)
    })

    describe('get details of current account', () =>
    {
        it('should define "get" method', () =>
        {
            expect(Reflect.has(accountsService, 'get')).toBe(true)
        })

        it('should return an object with nickname', async () =>
        {
            const accountObject = await accountsService.get(1)

            expect(Object.keys(accountObject)).toHaveLength(1)

            expect(Reflect.has(accountObject, 'nickname')).toBe(true)
            expect(typeof Reflect.get(accountObject, 'nickname')).toBe('string')
        })
    })
})
