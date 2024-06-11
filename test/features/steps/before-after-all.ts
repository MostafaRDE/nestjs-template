import { AfterAll, BeforeAll } from '@cucumber/cucumber'
import { NestExpressApplication } from '@nestjs/platform-express'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../src/app.module'

export let app: NestExpressApplication

BeforeAll(async () =>
{
    try
    {
        if (app === undefined)
        {
            // Initialize NestJS Application for Automated Testing
            // https://docs.nestjs.com/fundamentals/testing
            const moduleReference = await Test.createTestingModule({
                // TODO: Please add modules and services here.
                imports: [ AppModule ],
            }).compile()

            app = moduleReference.createNestApplication<NestExpressApplication>()
            await app.init()
        }
    }
    catch (error: unknown)
    {
        console.error(error)
        // eslint-disable-next-line unicorn/no-process-exit
        process.exit()
    }
})

AfterAll(async () =>
{
    await app.close()
})
