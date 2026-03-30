// Simple in-memory rate limiter for production deployment
const rateLimitStore = new Map();

const rateLimiter = async (req, res, next) => {
    try {
        const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
        const now = Date.now();
        const windowMs = 20 * 1000; // 20 seconds
        const maxRequests = 10;

        // Get or create rate limit data for this IP
        let rateLimitData = rateLimitStore.get(clientIp);

        if (!rateLimitData) {
            rateLimitData = {
                requests: [],
                windowStart: now
            };
            rateLimitStore.set(clientIp, rateLimitData);
        }

        // Clean old requests outside the window
        rateLimitData.requests = rateLimitData.requests.filter(timestamp =>
            now - timestamp < windowMs
        );

        // Reset window if it's expired
        if (now - rateLimitData.windowStart > windowMs) {
            rateLimitData.requests = [];
            rateLimitData.windowStart = now;
        }

        // Check if limit exceeded
        if (rateLimitData.requests.length >= maxRequests) {
            return res.status(429).json({
                message: "Too many requests, please try again later"
            });
        }

        // Add current request
        rateLimitData.requests.push(now);

        // Clean up old entries periodically
        if (rateLimitStore.size > 1000) {
            for (const [ip, data] of rateLimitStore.entries()) {
                if (now - data.windowStart > windowMs * 2) {
                    rateLimitStore.delete(ip);
                }
            }
        }

        next();
    } catch (error) {
        console.log("Rate limit error", error);
        next(); // Continue even if rate limiting fails
    }
};

export default rateLimiter;