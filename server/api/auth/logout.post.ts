export default defineEventHandler((event) => {
  clearAccountSession(event)

  return { ok: true }
})
