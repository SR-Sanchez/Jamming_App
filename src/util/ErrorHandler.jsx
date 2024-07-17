import { toast } from "react-toastify";

export default function handleError(data){
	if(data.error){
		const status = data.error.status;
		const message = data.error.message;
		if(status && message) {
			toast.error(`Error ${status}: ${message}`)
		} else {
			toast.error(`Error: ${data.error}`)
		}
	}
}