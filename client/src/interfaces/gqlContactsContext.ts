import { Method } from "axios";

export type AxiosParamsType = {
	url: string,
	method: Method,
	headers: {
		[key: string]: string
	}
}