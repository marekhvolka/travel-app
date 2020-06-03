import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import fs from 'fs'
import helmet from 'helmet'
import https from 'https'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import config from '../config/config'
import { User } from './models/User'
import { loginRequestHandler } from './request-handlers/login'
import { registerRequestHandler } from './request-handlers/register'
import { uploadFileRequestHandler } from './request-handlers/upload'
import { handleErrors, handleNotFound } from './utils/errors'

import { logger } from './utils/logger'

// import {executableSchema} from './graphql'

createConnection({
  useUnifiedTopology: true,
  type: 'mongodb',
  host: config.mongodb.host,
  port: 27017,
  logging: true,
  database: config.mongodb.database,
  username: config.mongodb.username,
  password: config.mongodb.password,
  entities: [__dirname + '/models/*.ts'],
})

const main = async () => {
  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use(compression())
  app.use(cors())
  app.use(helmet())

  app.use(express.static(config.resourcesDir))
  app.use(handleErrors)

  try {
    const schema = await buildSchema({
      resolvers: [__dirname + '/resolvers/*.ts'],
    })

    const apolloServer = new ApolloServer({
      schema,
      context: async ({ req }) => {
        const token = req.headers.authorization || ''
        const user = await User.findOne({ token })

        return { user, token }
      },
    })

    apolloServer.applyMiddleware({ app })
  } catch (e) {
    console.log(e)
  }

  app.post('/upload', uploadFileRequestHandler)
  app.post('/login', loginRequestHandler)
  app.post('/register', registerRequestHandler)

  app.get('*.js', (req, res, next) => {
    req.url = req.url + '.gz'
    res.set('Content-Encoding', 'gzip')
    next()
  })

  app.use(handleNotFound)

  const services = {
    server: undefined,
  }

  const backend = {
    start: async () => {
      services.server = await new Promise((resolve, reject) => {
        const listen = app.listen(config.server.port, () => {
          if (process.env.NODE_ENV === 'production') {
            logger.info('Server successfully running')
          } else {
            logger.info(`GraphiQL is now running on http://localhost:${config.server.port}/graphiql`)
          }

          resolve(listen)
        })
      })

      if (config.https.enabled) {
        const options = {
          key: await fs.readFile(config.https.keyFile),
          cert: await fs.readFile(config.https.certFile),
          dhparam: await fs.readFile(config.https.dhParam),
        }

        https.createServer(options, services.server).listen(config.server.httpsPort, () => {
          logger.info('HTTPS active')
        })
      }
    },
    stop: () => {
      logger.info('Shutting down server')
      services.server.close()
    }
  }

  process.once('SIGINT', () => backend.stop())
  process.once('SIGTERM', () => backend.stop())

  backend.start()
    .then(() => logger.info('App is running'))
    .catch((err: any) => logger.error(err))
}

main()
