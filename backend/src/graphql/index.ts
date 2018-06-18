import { makeExecutableSchema } from 'graphql-tools/dist/index'
import glue from 'schemaglue'
import GuideLoader from './guide/loader'

const { schema, resolver } = glue('src/graphql', { mode: 'ts' })

async function makeContext(app) {
  // Load authorized user from the authorization header
  const data = await getAuthPayload(app.ctx.header.authorization)

  // Create context - can be used in resolvers
  return {
    user: data && data.user,
    loaders: {
      guides: new GuideLoader(),
    },
  }
}

export const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolver,
})
