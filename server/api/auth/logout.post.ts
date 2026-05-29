export default defineEventHandler((event) => {
  setResponseStatus(event, 204)
  setResponseHeader(event, 'Refresh', '0')
  setResponseHeader(event, 'Clear-Site-Data', '"cookies", "storage", "cache"')
})
