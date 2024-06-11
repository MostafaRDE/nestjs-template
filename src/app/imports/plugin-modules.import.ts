import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { ClsModule } from 'nestjs-cls'
import { configLoader } from '../../config'
import { SequelizeConfigService } from './plugins/sequelize.config.service'

export const appImportsPluginModules = [
    ConfigModule.forRoot({
        envFilePath: '.env',
        load: [ configLoader ],
        isGlobal: true,
    }),
    ClsModule.forRoot({
        global: true,
        middleware: { mount: false },
    }),
    SequelizeModule.forRootAsync({
        useClass: SequelizeConfigService,
    }),
]
