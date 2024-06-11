import { Test } from '@nestjs/testing'
import { ClsModule, ClsService } from 'nestjs-cls'
import { CURRENT_USER } from '../../constants'
import { AccountsService } from './accounts.service'
import { ProfilesController } from './profiles.controller'

describe('ProfilesController', () =>
{
    let clsService: ClsService
    let accountCenterController: ProfilesController

    beforeAll(async () =>
    {
        const moduleReference = await Test.createTestingModule({
            imports: [ ClsModule ],
            controllers: [ ProfilesController ],
            providers: [
                {
                    provide: AccountsService,
                    useValue: {
                        get: jest.fn(() => ({ nickname: 'test-name' })),
                    },
                },
            ],
        }).compile()

        clsService = moduleReference.get(ClsService)
        accountCenterController = moduleReference.get(ProfilesController)
    })

    describe('get profile data', () =>
    {
        it('should define "get" method', () =>
        {
            expect(typeof Reflect.get(accountCenterController, 'get')).toBe('function')
        })

        it('should return an object with nickname as string value', async () =>
        {
            const profileObject = await clsService.runWith(
                { [ CURRENT_USER + '' ]: 1 },
                async () => await accountCenterController.get(),
            )

            expect(Object.keys(profileObject)).toHaveLength(1)

            expect(Reflect.has(profileObject, 'nickname')).toBe(true)
            expect(typeof Reflect.get(profileObject, 'nickname')).toBe('string')
        })
    })
})
