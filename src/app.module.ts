import { Module } from '@nestjs/common'
import { appImportsInternalModules } from './app/imports/internal-modules.import'
import { appImportsPluginModules } from './app/imports/plugin-modules.import'

@Module({
    imports: [
        ...appImportsPluginModules,
        ...appImportsInternalModules,
    ],
})
export class AppModule {}
