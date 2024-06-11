import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request as ExpressRequest } from 'express'
import { ClsService } from 'nestjs-cls'
import { CURRENT_USER } from '../../constants'
import { IS_PUBLIC_KEY } from './public.decorator'

@Injectable()
export class AuthenticationGuard implements CanActivate
{
    constructor(
        private readonly _reflector: Reflector,
        private readonly clsService: ClsService,
    ) {}

    canActivate(context: ExecutionContext): boolean
    {
        const request: ExpressRequest = context.switchToHttp().getRequest()
        const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ])
        if (isPublic)
            return true

        const accountId = Reflect.get(request.headers, 'x-account-id') as string

        if (!accountId)
            throw new UnauthorizedException()

        let canAccountAuthenticated = false
        try
        {
            // Authorizing the account in this code block 👇👇👇👇
            // For example after authenticated the account requester and authorization is ok, you can set it true
            canAccountAuthenticated = true
        }
        catch {}

        if (canAccountAuthenticated)
        {
            if (this.clsService.isActive())
                this.clsService.set(CURRENT_USER, accountId)
            return true
        }

        throw new UnauthorizedException()
    }
}
