const fs = require('fs')
const http = require('http')
const https = require('https')

const getFileOrThrowErr = (fileName, errorMsg) => {
  const isFileExist = fileName => fs.existsSync(fileName)
  const getFileContent = fileName => fs.readFileSync(fileName)

  if (!isFileExist(fileName)) {
    throw new Error(errorMsg)
    process.exit()
  }

  return getFileContent(fileName)
}

const loadHttpsConfig = ({ hostname, port, key, cert }) => {
  const keyErrorMsg = 'keyErrorMsg'
  const certErrorMsg = 'certErrorMsg'

  return {
    hostname,
    port,
    key: getFileOrThrowErr(key, keyErrorMsg),
    cert: getFileOrThrowErr(cert, certErrorMsg)
  }
}

const createServerHTTP = ({ port, hostname, app }) => {
  const server = new http.createServer(app)
  return server
}

const createServerHTTPS = ({ port, hostname, key, cert, app }) => {
  const options = loadHttpsConfig({
    hostname,
    port,
    key,
    cert
  })
  const server = https.createServer(options, app)
  return server
}

module.exports = {
  http: createServerHTTP,
  https: createServerHTTPS
}
