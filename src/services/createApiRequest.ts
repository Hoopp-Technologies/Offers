import type { AxiosResponse, ResponseType } from "axios";
import Axios from ".";
import { toast } from "sonner";

export interface createApiOptions {
	url: string;
	queryParams?: string;
	data?: Record<string, unknown> | FormData;
	method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
	apiOptions?: {
		responseType?: ResponseType;
		headers?: Record<string, string>;
	};
}

export const createApiRequest = async <TData>(
	options: createApiOptions
): Promise<TData> => {
	const { url, queryParams, method, data, apiOptions = {} } = options;
	const fullUrl = `${url}${queryParams ? `?${queryParams}` : ""}`;
	const token = localStorage.getItem("token");

	const { headers, ...rest } = apiOptions;
	const additionalHeaders = {
		Authorization: `Bearer ${token}`,
		withCredentials: true,
	};

	const updatedHeaders = {
		...headers,
		...(token ? additionalHeaders : {}),
	};

	// Use updatedHeaders as needed

	const response = await Axios({
		url: fullUrl,
		method,
		//withCredentials: true,
		headers: updatedHeaders,
		...(data ? { data: data } : {}),
		...rest,
	})
		.then((response: AxiosResponse<TData>) => {
			return response; // return data only, not the whole response
		})
		.catch((error) => {
			toast.error(typeof error?.response?.data === "string" ? error?.response?.data : error?.message ?? "Error: please try again")
			throw error;
		});

	return response as TData;
};
