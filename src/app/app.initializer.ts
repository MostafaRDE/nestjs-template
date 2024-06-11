import { VersioningType } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { AuthenticationGuard } from '../modules/authentication/authentication.guard'

export function appInitializer(app: NestExpressApplication): void
{
    app.enableCors({ origin: '*', allowedHeaders: '*', methods: '*' })

    app.use(helmet({ crossOriginResourcePolicy: false }))
    app.use(cookieParser())

    app.setGlobalPrefix('api')
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })

    app.set('trust proxy', true)

    const authenticationGuard = app.get(AuthenticationGuard)
    app.useGlobalGuards(authenticationGuard)
}
