export const getContactsQuery = `query {
	contacts {
		_id
		name
		email
	}
}`

export const createContactQuery = `mutation CreateContact($input: ContactInput) {
	createContact(input: $input) {
		_id
		name
		email
	}
}`

export const updateContactQuery = `mutation UpdateContact(
	$id: ID!
	$input: ContactInput
) {
	updateContact(id: $id, input: $input) {
		_id
		name
		email
	}
}`

export const deleteContactQuery = `mutation DeleteContact($id: ID!) {
	deleteContact(id: $id) {
		_id
		name
		email
	}
}`