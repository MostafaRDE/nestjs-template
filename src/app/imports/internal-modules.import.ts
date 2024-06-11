import { AccountCenterModule } from '../../modules/account-center/account-center.module'
import { AuthenticationModule } from '../../modules/authentication/authentication.module'
import { HealthCheckModule } from '../../modules/health-check/health-check.module'

export const appImportsInternalModules = [
    AuthenticationModule,
    AccountCenterModule,
    HealthCheckModule,
]
