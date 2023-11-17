/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
// Import the framework and instantiate it
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', function (request, reply) {
  return { hello: 'world' }
})


// Run the server!
fastify.listen({ port: +(process.env.PORT || 3000) }, (err) => {
  if (err !== null) {
    fastify.log.error(err)
    process.exit(1)
  }
})