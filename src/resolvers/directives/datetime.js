const datetime = async (next, source, args, ctx) => {
  const value = await next()
  const { format } = args
  return format
}

module.exports = datetime
