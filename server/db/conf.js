const mongoose = require('mongoose')

const dbConnect = async () => {
	try {
		await mongoose.connect('mongodb+srv://restAPI_admin:lucifierM0rn1ninSt2r@cluster0.iupx5.mongodb.net/contacts', {
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