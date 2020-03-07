import * as fs from 'fs'

require('dotenv').config()

// hack for dealing with base64-encoded google service account on AWS lambda
const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS
const prodCredentialsPath = '/tmp/google.json'

try {
  const json = JSON.parse(Buffer.from(credentials, 'base64').toString())
  fs.writeFileSync(prodCredentialsPath, JSON.stringify(json))
  process.env.GOOGLE_APPLICATION_CREDENTIALS = prodCredentialsPath
} catch (err) {}
