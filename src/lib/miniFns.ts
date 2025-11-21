import { toast } from "sonner";

export const validatePassword = (password: string) => {
  const conditions = [
    { regex: /.{8,}/, message: "Password must be at least 8 characters long" },
    {
      regex: /[A-Z]/,
      message: "Password must contain at least one uppercase letter",
    },
    {
      regex: /[a-z]/,
      message: "Password must contain at least one lowercase letter",
    },
    {
      regex: /[!@#$%^&*(),.?":{}|<>]/,
      message: "Password must contain at least one special character",
    },
  ];

  for (const condition of conditions) {
    if (!condition.regex.test(password)) {
      toast.error(condition.message);
      return false;
    }
  }
  return true;
};