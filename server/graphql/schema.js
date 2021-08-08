import { buildSchema } from'graphql'

export const schema = buildSchema(`
	input ContactInput {
		name: String
		email: String
	}

	type Contact {
		_id: ID!
		name: String!
		email: String!
	}

  type Query {
    contacts: [Contact]!
		contact(id: ID!): Contact!
  }

	type Mutation {
		createContact(input: ContactInput): Contact
		updateContact(id: ID!, input: ContactInput): Contact
		deleteContact(id: ID!): Contact
	}
	`)