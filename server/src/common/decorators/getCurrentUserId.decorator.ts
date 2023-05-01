import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { jwtPayload } from "src/auth/types";

export const getCurrentUserId = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): number => {
        const req = ctx.switchToHttp().getRequest()
        const user = req.user as jwtPayload
        return user.sub
    }
)