import {
  entities,
  User,
} from '@md/common'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import fs from 'fs'
import helmet from 'helmet'
import https, { ServerOptions } from 'https'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { createConnection, getRepository } from 'typeorm'
import config from '../config/config'
import { loginRequestHandler } from './request-handlers/login'
import { registerRequestHandler } from './request-handlers/register'
import { uploadFileRequestHandler } from './request-handlers/upload'
import { handleErrors, handleNotFound } from './utils/errors'
import { logger } from './utils/logger'

(async () => {
  await createConnection({
    useUnifiedTopology: true,
    type: 'mongodb',
    host: config.mongodb.host,
    port: 27017,
    logging: true,
    database: config.mongodb.database,
    username: config.mongodb.username,
    password: config.mongodb.password,
    entities: entities,
  })

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
      context: async ({ req, res }) => {
        const token = req.headers.authorization || ''
        const user = await getRepository(User).findOne({ token })

        return { req, res, user, token }
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

  app.listen(config.server.port, () => {
    if (process.env.NODE_ENV === 'production') {
      logger.info('Server successfully running')
    } else {
      logger.info(`GraphiQL is now running on http://localhost:${config.server.port}/graphiql`)
    }
  })

  if (config.https.enabled) {
    const options: ServerOptions = {
      key: await fs.readFileSync(config.https.keyFile),
      cert: await fs.readFileSync(config.https.certFile),
      dhparam: await fs.readFileSync(config.https.dhParam),
    }

    https.createServer(options, app).listen(config.server.httpsPort, () => {
      logger.info('HTTPS active')
    })
  }
})()
