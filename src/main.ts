import './config-extra'

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { appInitializer } from './app/app.initializer'

async function bootstrap()
{
    const clusteringLogger = new Logger('Clustering', { timestamp: true })

    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    appInitializer(app)

    await app.listen(+(process.env.APP_PORT || 3000), process.env.APP_HOST || 'localhost')

    // Listen to shutdown message from PM2 or other parent processes
    pm2ShutdownMessage()

    // Send to PM2 or other parent processes
    if (process.send) process.send('ready')

    clusteringLogger.log('Cluster is ready')
}

function pm2ShutdownMessage()
{
    process.on('message', function (message)
    {
        if (message === 'shutdown')
        {
            console.log('PM2 => Closing all connections...')
            setTimeout(function ()
            {
                console.log('PM2 => Finished closing connections')
                process.exit(0)
            }, 1500)
        }
    })
}

void bootstrap()
