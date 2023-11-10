import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import {
  createNewExample,
  deleteExample,
  updateExample,
} from '../Services/ExampleService'

export async function exampleRoutes(app: FastifyInstance) {
  app.get('/example', async (_, reply: FastifyReply) => {
    const examples = await prisma.example.findMany({})
    reply.code(200).send(examples)
  })

  app.get(
    '/example/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })

      try {
        const { id } = paramsSchema.parse(request.params)
        const example = await prisma.example.findUnique({
          where: {
            id,
          },
        })

        example ? reply.code(200).send(example) : reply.code(404)
      } catch (err) {
        if (err instanceof z.ZodError) {
          reply.code(400).send(JSON.parse(err.message))
        }
        reply.code(400).send(err)
      }

      const examples = await prisma.example.findMany({})
      reply.code(200).send(examples)
    },
  )

  app.post('/example', async (request: FastifyRequest, reply: FastifyReply) => {
    const bodySchema = z.object({
      name: z.string(),
    })

    try {
      const { name } = bodySchema.parse(request.body)
      const example = await createNewExample({ name })
      reply.code(201).send(example)
    } catch (err) {
      if (err instanceof z.ZodError) {
        reply.code(400).send(JSON.parse(err.message))
      }
      reply.code(400).send(err)
    }
  })

  app.put(
    '/example/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })

      const bodySchema = z.object({
        name: z.string(),
      })

      try {
        const { id } = paramsSchema.parse(request.params)
        const { name } = bodySchema.parse(request.body)

        // Verifica se o exemplo com o ID fornecido existe
        const existingExample = await prisma.example.findUnique({
          where: {
            id,
          },
        })

        if (!existingExample) {
          reply.code(404).send({ error: 'Example NOT FOUND' })
          return
        }

        // Atualiza o exemplo com os novos dados
        const updatedExample = await updateExample({ id, name })

        reply.code(200).send(updatedExample)
      } catch (err) {
        if (err instanceof z.ZodError) {
          reply.code(400).send(JSON.parse(err.message))
        }
        reply.code(400).send(err)
      }
    },
  )

  app.delete(
    '/example/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })

      try {
        const { id } = paramsSchema.parse(request.params)

        const existingExample = await prisma.example.findUnique({
          where: {
            id,
          },
        })

        if (!existingExample) {
          reply.code(404).send({ error: 'Example NOT FOUND' })
          return
        }

        await deleteExample(id)

        reply.code(204).send()
      } catch (err) {
        if (err instanceof z.ZodError) {
          reply.code(400).send(JSON.parse(err.message))
        }
        reply.code(400).send(err)
      }
    },
  )
}
