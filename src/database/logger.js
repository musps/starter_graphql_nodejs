const printLog = true
const logger = (query) => {
  console.group('✅ New query')
  console.log(query)
  console.groupEnd()
}

module.exports = printLog ? logger : false
