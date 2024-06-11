import { CanActivate, ServiceUnavailableException } from '@nestjs/common'

export class AppHealthCheckGuard implements CanActivate
{
    canActivate(): boolean
    {
        const isAppHealthOk = true
        if (!isAppHealthOk)
            throw new ServiceUnavailableException()

        return true
    }
}