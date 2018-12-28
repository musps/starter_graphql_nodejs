const fs = require('fs')
const { gql } = require('apollo-server-express')

const getFile = (fileName) => {
  const rootPath = './src/schemas'
  const isFileExist = fileName => fs.existsSync(fileName)
  const getFileContent = fileName => fs.readFileSync(fileName, 'utf8')
  const tmpFileName = rootPath + fileName

  if (!isFileExist(tmpFileName)) {
    return 'ERR_FILE_NOT_FOUND'
  } else {
    return getFileContent(tmpFileName)
  }
}

const schema = getFile('/rootSchema.gql')
module.exports = gql(schema)
