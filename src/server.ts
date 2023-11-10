import fastify from 'fastify'

const app = fastify()

// Get route to check if server is working
app.get('/', () => {
  return {
    message: 'ok',
  }
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('📡 HTTP Server running on http://localhost:3333')
  })
