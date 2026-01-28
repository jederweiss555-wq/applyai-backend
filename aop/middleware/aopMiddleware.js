// aopMiddleware.js

// AOP Middleware for Fastify

function aopMiddleware(fastify) {
    return async (request, reply) => {
        // Before handler logic
        console.log(`Incoming request: ${request.method} ${request.url}`);

        // Proceed to the next handler
        await fastify.next();

        // After handler logic
        console.log('Response sent:', reply.statusCode);
    };
}

module.exports = aopMiddleware;
