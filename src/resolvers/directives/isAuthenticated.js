const isAuthenticated = async (next, source, args, ctx) => {
  const userConnector = ctx.req.headers.user_connector || null

  if (userConnector === null || userConnector !== global.userConnector) {
    throw new Error('Access denied !')
  } else {
    return next()
  }
}

module.exports = isAuthenticated
