const fs = require('fs')
const http = require('http')
const https = require('https')

const getFileOrThrowErr = (fileName, errorMsg) => {
  const isFileExist = fileName => fs.existsSync(fileName)
  const getFileContent = fileName => fs.readFileSync(fileName, 'utf8')

  if (!isFileExist) {
    throw new Error(errorMsg)
    process.exit(1)
  }

  return getFileContent(tmpFileName)
}

const loadHttpsConfig = ({ hostname, port, key, cert }) => {
  const keyErrorMsg = 'keyErrorMsg'
  const certErrorMsg = 'certErrorMsg'

  return {
    hostname,
    port,
    key,
    cert
  }
}

const createServerHTTP = ({ port, hostname, app }) => {
  const server = new http.createServer(app)
  return server
}

const createServerHTTPS = (port, hostname, key, cert, app) => {
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
