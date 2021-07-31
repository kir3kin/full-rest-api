type requestType = (
	url: string,
	method?: "GET" | "POST" | "PUT" | "DELETE",
	data?: any
) => any

export const request: requestType = async (url, method = "GET", data = null) => {
	try {
		let body
// eslint-disable-next-line
		const headers = <{['Content-Type']: string}>{} 
		if (data) {
			headers['Content-Type'] = 'application/json'
			body = JSON.stringify(data)
		}


		const response = await fetch(url, {
			method,
			headers,
			body
		})

		return response.json()
	} catch(e) {
		console.warn('Error:', e.message)
	}
}