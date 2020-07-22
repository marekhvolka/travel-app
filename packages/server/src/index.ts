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

import dotenv from 'dotenv'
dotenv.config()

import { config } from './config'
import { loginRequestHandler } from './request-handlers/login'
import { registerRequestHandler } from './request-handlers/register'
import { uploadFileRequestHandler } from './request-handlers/upload'
import { handleErrors, handleNotFound } from './utils/errors'
import { logger } from './utils/logger'

(async () => {
  await createConnection({
    useUnifiedTopology: true,
    type: 'mongodb',
    host: config.dbHost,
    port: 27017,
    logging: true,
    database: config.dbName,
    username: config.dbUser,
    password: config.dbPassword,
    entities: entities,
  })

  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use(compression())
  app.use(cors())
  app.use(helmet())

  app.get('/hello', (req, res) => {
    res.send({
      msg: "Hello from the server22222"
    })
  })

  app.use(express.static('resources'))
  app.use(handleErrors)

  try {
    const schema = await buildSchema({
      resolvers: [__dirname + '/resolvers/*'],
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

  // app.use(handleNotFound)

  app.listen(config.port, () => {
    if (process.env.NODE_ENV === 'production') {
      logger.info('Server successfully running')
    } else {
      logger.info(`GraphiQL is now running on http://localhost:${config.port}/graphiql`)
    }
  })

  // if (config.httpsEnabled) {
  //   const options: ServerOptions = {
  //     key: await fs.readFileSync(config.https.keyFile),
  //     cert: await fs.readFileSync(config.https.certFile),
  //     dhparam: await fs.readFileSync(config.https.dhParam),
  //   }
  //
  //   https.createServer(options, app).listen(config.server.httpsPort, () => {
  //     logger.info('HTTPS active')
  //   })
  // }
})()
