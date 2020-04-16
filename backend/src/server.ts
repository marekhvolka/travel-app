import "reflect-metadata";
import * as multiparty from 'multiparty'
import bodyParser from 'body-parser'
import compression from 'compression'
import fs from 'fs'
import https from 'https'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import {apolloUploadExpress} from 'apollo-upload-server'
import config from '../config/config'

import {saveFile} from './utils/file-functions'
import log from './utils/logger'

// import {executableSchema} from './graphql'

import * as bcrypt from "bcrypt";
import {User} from "./models/User";
import {generateToken} from "./utils/auth-functions";
import {createConnection} from "typeorm";
import {buildSchema} from "type-graphql";
import {ApolloServer} from "apollo-server-express";

createConnection({
  useUnifiedTopology: true,
  type: "mongodb",
  host: config.mongodb.host,
  port: 27017,
  logging: true,
  database: config.mongodb.database,
  username: config.mongodb.username,
  password: config.mongodb.password,
  entities: [
    __dirname + "/models/*.ts"
  ],
})

const main = async () => {

  const app = express()

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.use(compression())
  app.use(cors())
  app.use(helmet())

  app.use(express.static(config.resourcesDir))

  try {
    const schema = await buildSchema({
      resolvers: [__dirname + "/resolvers/*.ts"],
    });

    const apolloServer = new ApolloServer({
      schema
    });

    apolloServer.applyMiddleware({app})
  } catch (e) {
    console.log(e)
  }


  app.listen(3001, () => {
    console.log('Server started on http://localhost/graphql')
  })

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
    const form = new multiparty.Form()
    form.parse(req, async (err, fields, files) => {
      const targetFileName = fields['filename'][0]
      const targetPath = fields['path'][0]
      const crop = JSON.parse(fields['crop'][0])
      const file = files.file[0]

      await saveFile(file.path, targetPath, targetFileName, crop)

      res.json({status: 'ok'})
    })
  })

  app.post('/login', async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
      return res.status(400).send({message: 'Please enter both id and password'});
    }

    const user = await User.findOne({email})

    if (!user) {
      return res.status(400).send({message: 'Invalid credentials!'});
    }

    const valid = await bcrypt.compare(password, user.passwordHash)

    if (!valid) {
      return res.status(400).send({message: 'Invalid credentials!'});
    }

    // if (restricted && user.role !== 'admin') {
    //   return {
    //     error: 'Not authorized'
    //   }
    // }

    res.json({
      user,
      token: generateToken(user),
      error: undefined
    })
  })

  app.post('/register', async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
      return res.status(400).send({message: 'Please enter both id and password'});
    }

    const existedUser = await User.findOne({email})

    if (existedUser) {
      return res.status(400).send({message: 'User already existed'});
    }

    const user = await User.create({
      email,
      role: 'player',
      passwordHash: await bcrypt.hash(password.trim(), 10)
    })

    // if (restricted && user.role !== 'admin') {
    //   return {
    //     error: 'Not authorized'
    //   }
    // }

    res.json({
      user,
      token: generateToken(user),
      error: undefined
    })
  })

  app.get('*.js', function (req, res, next) {
    req.url = req.url + '.gz'
    res.set('Content-Encoding', 'gzip')
    next()
  })

  const services = {
    server: undefined,
  }

  app.start = async () => {
    services.server = await new Promise((resolve, reject) => {
      const listen = app.listen(config.server.port, () => {
        if (process.env.NODE_ENV === 'production') {
          log.info('Server successfully running')
        } else {
          log.info(
            `GraphiQL is now running on http://localhost:${
              config.server.port
              }/graphiql`
          )
        }

        resolve(listen)
      })
    })

    if (config.https.enabled) {
      const options = {
        key: await fs.readFile(config.https.keyFile),
        cert: await fs.readFile(config.https.certFile),
        dhparam: await fs.readFile(config.https.dhParam)
      }

      https
        .createServer(options, services.server)
        .listen(config.server.httpsPort, () => {
          log.info('HTTPS active')
        })
    }
  }

  app.stop = () => {
    log.info('Shutting down server')
    services.server.close()
  }

  process.once('SIGINT', () => app.stop())
  process.once('SIGTERM', () => app.stop())

  app.start()
    .then(() => log.info('App is running'))
    .catch((err) => log.error(err))

}

main()
