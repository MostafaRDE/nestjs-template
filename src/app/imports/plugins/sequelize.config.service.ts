import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SequelizeOptionsFactory, SequelizeModuleOptions } from '@nestjs/sequelize'
import * as path from 'node:path'

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory
{
    constructor(private readonly configService: ConfigService) {}

    createSequelizeOptions(): SequelizeModuleOptions
    {
        return {
            dialect: 'mysql',
            host: this.configService.get('database.sequelize.host'),
            port: this.configService.get<number>('database.sequelize.port'),
            username: this.configService.get('database.sequelize.username'),
            password: this.configService.get('database.sequelize.password'),
            database: this.configService.get('database.sequelize.database'),
            models: [
                path.join(__dirname, '../../../database/sequelize/models/*.sequelize.model.js'),
            ],
        }
    }
}