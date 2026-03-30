import ratelimit from '../config/upstash.js'

const rateLimiter = async (req, res, next) => {
    try {
        const clientIp = req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown'

        const { success, limit, remaining, reset } = await ratelimit.limit(`rate-limit:${clientIp}`)

        res.setHeader('X-RateLimit-Limit', limit)
        res.setHeader('X-RateLimit-Remaining', remaining)
        res.setHeader('X-RateLimit-Reset', reset)

        if (!success) {
            return res.status(429).json({
                message: 'Too many requests, please try again later',
            })
        }

        next()
    } catch (error) {
        console.log('Upstash rate limit error', error)
        next()
    }
}

export default rateLimiter;