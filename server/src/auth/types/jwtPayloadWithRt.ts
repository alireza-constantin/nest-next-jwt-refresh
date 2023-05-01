import { jwtPayload } from "./jwtPayload";

export type jwtPayloadWithRt = jwtPayload & { refreshToken: string }