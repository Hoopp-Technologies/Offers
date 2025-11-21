// import { toast } from "react-hot-toast";

import { toast } from "sonner";
import { AxiosError } from "axios";
import { handleClearLocalStorage } from ".";

export type CustomError = {
  data: {
    error: {
      location: string;
      msg: string;
      path: string;
    }[];
    message: string;
  };
  status: number;
};

// import { toastHandler } from '@/components/utils/Toast'

const handleResponseError = (error: AxiosError) => {
  if (error) {
    const { status, message } = error;

    if (message) {
      console.log(message)
      toast.error(message);
      return;
    }

    // if (typeof errors === "string") {
    //   toast.error(errors);
    //   return;
    // }

    // errors.forEach((error) => {
    //   return toast.error(error.msg);
    // });
    // if (status === 403) {
    //   toast.error(error.response?.data?.error as unknown as string)
    // }

    if (status === 401) {
      handleClearLocalStorage()      
      window.location.href = "/";
    }
    // if (message) {

    //     if (message === "No Authorization" || message.includes("Auth token")) {
    //         redirect();
    //         return;
    //     }
    // }
  } else {
    console.log(error);
  }
};

export default handleResponseError;
