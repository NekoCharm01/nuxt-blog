export default defineEventHandler((event) => {
  clearUserSession(event)
  setResponseStatus(event, 204)
})
