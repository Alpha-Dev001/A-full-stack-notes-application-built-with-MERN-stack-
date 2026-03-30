import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

import dotenv from 'dotenv'

dotenv.config()

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error('UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set')
}

const redis = Redis.fromEnv()

const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '20 s'),
    analytics: true,
    prefix: 'notes-mern-rate-limit',
})

export default ratelimit;