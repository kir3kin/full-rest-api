import { graphqlHTTP } from 'express-graphql'
import { schema } from '../graphql/schema.js'
import { root } from '../graphql/root.js'

export const graphUrl = '/api/gqlContacts'
export const graphHttp = graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true,
})