import { Module } from '@nestjs/common'
import { AuthenticationGuard } from './authentication.guard'

@Module({
    providers: [ AuthenticationGuard ],
    exports: [ AuthenticationGuard ],
})
export class AuthenticationModule {}
