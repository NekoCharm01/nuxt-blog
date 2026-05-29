import type { H3Event } from 'h3'
import { z } from 'zod'

export async function readZodBody<T>(event: H3Event, schema: z.ZodType<T>): Promise<T> {
  const result = schema.safeParse(await readBody(event))

  if (!result.success) {
    throw createZodError(result.error)
  }

  return result.data
}

export function getZodRouterParams<T>(
  event: H3Event,
  schema: z.ZodType<T>,
  options?: { decode?: boolean }
): T {
  const result = schema.safeParse(getRouterParams(event, options))

  if (!result.success) {
    throw createZodError(result.error)
  }

  return result.data
}

export function getZodQuery<T>(event: H3Event, schema: z.ZodType<T>): T {
  const result = schema.safeParse(getQuery(event))

  if (!result.success) {
    throw createZodError(result.error)
  }

  return result.data
}

function createZodError(error: z.ZodError) {
  return createError({
    status: 400,
    message: z.prettifyError(error),
    data: z.flattenError(error),
  })
}
