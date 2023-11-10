import fastify from 'fastify'
import { exampleRoutes } from './Controllers/ExampleRoutes'

// If you want Logger you can uncomment below
const app = fastify({
  // logger: {
  //   level: 'info',
  //   file: `./log/${Date.now()}.log`,
  // },
})

// Get route to check server status
app.get('/status', () => {
  return {
    message: 'ok',
  }
})

// Registering Routes/Controllers
app.register(exampleRoutes)

const port = process.env.PORT ? Number(process.env.PORT) : 3333

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`📡 HTTP Server running on http://localhost:${port}`)
  })
