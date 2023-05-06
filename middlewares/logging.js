const loggingMiddleware = (req, res, next) => {
    const { method, url } = req;
    const start = Date.now();

    res.on('finish', () => {
        const { statusCode } = res;
        const responseTime = Date.now() - start;

        console.log(`[${method}] ${url} - ${statusCode} (${responseTime}ms)`);
    });

    next();
};

module.exports = loggingMiddleware;
