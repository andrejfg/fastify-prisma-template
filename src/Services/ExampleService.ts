import { prisma } from '../lib/prisma'

interface createNewExampleProps {
  name: string
}

export async function createNewExample({ name }: createNewExampleProps) {
  const example = await prisma.example.create({
    data: {
      name,
    },
  })
  return example
}

interface updateExampleProps {
  id: string
  name: string
}

export async function updateExample({ id, name }: updateExampleProps) {
  const updatedExample = await prisma.example.update({
    where: {
      id,
    },
    data: {
      name,
    },
  })
  return updatedExample
}

export async function deleteExample(id: string): Promise<void> {
  await prisma.example.delete({
    where: {
      id,
    },
  })
}
