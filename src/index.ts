// Import the framework and instantiate it
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', function (request, reply) {
  return { hello: 'world' }
})

const port = +(process.env.PORT ?? 3000);

// Run the server!
fastify.listen({ port }, (err) => {
  if (err !== null) {
    fastify.log.error(err)
    process.exit(1)
  }
})