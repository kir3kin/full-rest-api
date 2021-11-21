const mongoose = require('mongoose')

const dbConnect = async () => {
	try {
		await mongoose.connect('mongodb+srv://restApi:TYxXBv8awNU9D9q@experiments.p39am.mongodb.net/contacts', {
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
			useCreateIndex: true
		})
	} catch(e) {
		console.log('Database error:', e.message)
	}
}

module.exports = dbConnect