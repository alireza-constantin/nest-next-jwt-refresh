import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { jwtPayloadWithRt } from "src/auth/types";

export const getCurrentUser = createParamDecorator(
    (data: keyof jwtPayloadWithRt | undefined, ctx: ExecutionContext): number => {
        const req = ctx.switchToHttp().getRequest()
        if(!data) return req.user
        return req.user[data]
    }
)