import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";

export const getRefreshToken = createParamDecorator(
    (data: string, ctx: ExecutionContext): number => {
        const req: Request = ctx.switchToHttp().getRequest()
        if(!data) return req.cookies
        return req.cookies?.[data]
    }
)