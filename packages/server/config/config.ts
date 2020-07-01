import fs from 'fs'
import path from 'path'

let configBuffer = null

// Init config_buffer according to the NODE_ENV
switch (process.env.NODE_ENV) {
  case 'production':
    configBuffer = fs.readFileSync(path.resolve(__dirname, 'prod.json'), 'utf-8')
    break
  default:
    configBuffer = fs.readFileSync(path.resolve(__dirname, 'dev.json'), 'utf-8')
}

export default JSON.parse(configBuffer)
