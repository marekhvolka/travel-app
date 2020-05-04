import { ApolloServer } from 'apollo-server-express'
import { apolloUploadExpress } from 'apollo-upload-server'
import { compare, hash } from 'bcrypt'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import fs from 'fs'
import helmet from 'helmet'
import https from 'https'
import { Form } from 'multiparty'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import config from '../config/config'
import { User } from './models/User'
import { generateToken } from './utils/auth-functions'
import { handleErrors, handleNotFound } from './utils/errors'

import { saveFile } from './utils/file-functions'
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

        // get the user token from the headers
        const token = req.headers.authorization || ''

        // try to retrieve a user with the token
        const user = (await User.findOne({ token }))

        // add the user to the context
        return { user, token }
      },
    })

    apolloServer.applyMiddleware({ app })
  } catch (e) {
    console.log(e)
  }

  // app.listen(3001, () => {
  //   console.log('Server started on http://localhost/graphql')
  // })

  // app.use(
  //   '/graphql',
  //   bodyParser.json(),
  //   apolloUploadExpress({
  //     maxFileSize: 10000000,
  //     maxFiles: 10
  //   }),
  //   graphqlExpress({schema})
  // )
  //
  // if (process.env.NODE_ENV !== 'production') {
  //   app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))
  // }

  app.post('/upload', (req, res, next) => {
    const form = new Form()
    form.parse(req, async (err, fields, files) => {
      const targetFileName = fields['filename'][0]
      const targetPath = fields['path'][0]
      const crop = JSON.parse(fields['crop'][0])
      const file = files.file[0]

      await saveFile(file.path, targetPath, targetFileName, crop)

      res.json({ status: 'ok' })
    })
  })

  app.post('/login', async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
      return res.status(400).send({ message: 'Please enter both id and password' })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).send({ message: 'Invalid credentials!' })
    }

    const valid = await compare(password, user.passwordHash)

    if (!valid) {
      return res.status(400).send({ message: 'Invalid credentials!' })
    }

    // if (restricted && user.role !== 'admin') {
    //   return {
    //     error: 'Not authorized'
    //   }
    // }

    const token = generateToken(user)

    User.update({ email }, { token })

    res.json({
      user,
      token,
      error: undefined,
    })
  })

  app.post('/register', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
      return res.status(400).send({ message: 'Please enter both id and password' })
    }

    const existedUser = await User.findOne({ email })

    if (existedUser) {
      return res.status(400).send({ message: 'User already existed' })
    }

    const user = await User.create({
      email,
      role: 'player',
      passwordHash: await hash(password.trim(), 10),
    }).save()

    // if (restricted && user.role !== 'admin') {
    //   return {
    //     error: 'Not authorized'
    //   }
    // }

    res.json({
      user,
      token: generateToken(user),
      error: undefined,
    })
  })

  app.get('*.js', (req, res, next) => {
    req.url = req.url + '.gz'
    res.set('Content-Encoding', 'gzip')
    next()
  })

  app.use(handleNotFound)

  const services = {
    server: undefined,
  }

  app.start = async () => {
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
  }

  app.stop = () => {
    logger.info('Shutting down server')
    services.server.close()
  }

  process.once('SIGINT', () => app.stop())
  process.once('SIGTERM', () => app.stop())

  app
    .start()
    .then(() => logger.info('App is running'))
    .catch((err: any) => logger.error(err))
}

main()
