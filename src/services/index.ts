import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios"
import handleResponseError from "./handleResponseError";
import config from "@/config/index";

const { apiHost } = config().secrets;

const BASE_URL = `${apiHost}/api/v1/`;

export { BASE_URL };

const requestHeaders: { [key: string]: string } = {
	"Content-Type": "application/json",
	"Access-Control-Allow-Origin": "*",
};

const Axios: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: requestHeaders,
	// withCredentials: true,
});

export function handleClearLocalStorage() {
	return ["user", "loggedIn", "token"].forEach((key) => {
		window.localStorage.removeItem(key);
	});
}

// Add a request interceptor
Axios.interceptors.request.use(
	function (config: InternalAxiosRequestConfig) {
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
Axios.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data;
	},
	function (error) {
		
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// if (error.response.status === 401 || error.response.status === 403) {
		//     handleResponseError(error.response)
		//     handleClearLocalStorage()
		//     window.location.href = '/login'
		//     return
		// }
		console.log("hyt");
		handleResponseError(error.response);
		throw error;
		// return error;
	}
);

export default Axios;
