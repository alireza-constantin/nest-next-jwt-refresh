
export const __isProd__ = process.env.NODE_ENV !== 'development'

// if you want to change this you need to also change refresh token expire date in authservice.ts
export const REFRESH_TOKEN_MAX_AGE = 15 * 24 * 60 * 60 * 1000 // 15 days

