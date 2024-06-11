import { Module } from '@nestjs/common'
import { AppHealthCheckGuard } from './app.health-check.guard'

@Module({
    providers: [ AppHealthCheckGuard ],
    exports: [ AppHealthCheckGuard ],
})
export class HealthCheckModule {}
