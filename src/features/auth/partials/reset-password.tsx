import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context";
import { BASE_URL } from "@/services";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { validatePassword } from "@/lib/miniFns";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [seePass, setSeePass] = useState(false);
  const [seePass2, setSeePass2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setShowAuth } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<{ password1: string; password2: string; token: string }>();

  const onSubmit = async (data: {
    password1: string;
    password2: string;
    token: string;
  }) => {
    if (!validatePassword(data.password1)) return;
    if (data.password1 !== data.password2) {
      toast.error("Passwords don't match");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}ecommerce/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: data.password1,
          token: data.token,
        }),
      });

      if (response.status === 200) {
        toast.success("Password successfully reset. You can now log in.");
        setIsLoading(false);
        setShowAuth(true);
        navigate("/");
      } else {
        const error = await response.text();
        toast.error(error);
        setIsLoading(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center container mx-auto px-6 py-32">
      <div className="bg-white rounded-lg py-12 px-8">
        <form
          className="flex flex-col gap-6 mt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-center font-bold text-2xl mb-11">
            Reset your password
          </h2>
          <p className="text-center mb-4">
            Create a new password for your account
          </p>
          <div className="relative">
            <Input
              id="password1"
              type={seePass ? "text" : "password"}
              placeholder="Type new password"
              className="mt-2.5 w-md"
              onRightIconClick={() => setSeePass((prev) => !prev)}
              rightIcon={
                seePass ? (
                  <EyeOff
                    className=" text-[#7F7F7F] cursor-pointer"
                    size={18}
                  />
                ) : (
                  <Eye className=" text-[#7F7F7F] cursor-pointer" size={18} />
                )
              }
              {...register("password1", {
                required: true,
              })}
            />
          </div>

          <div className="relative">
            <Input
              id="password2"
              type={seePass2 ? "text" : "password"}
              placeholder="Re-type new password"
              className=""
              onRightIconClick={() => setSeePass2((prev) => !prev)}
              rightIcon={
                seePass2 ? (
                  <EyeOff
                    className=" text-[#7F7F7F] cursor-pointer"
                    size={18}
                  />
                ) : (
                  <Eye className=" text-[#7F7F7F] cursor-pointer" size={18} />
                )
              }
              {...register("password2", { required: true })}
            />
          </div>
          <div className="relative">
            <Input
              id="token"
              type="text"
              placeholder="Enter OTP token"
              className=""
              {...register("token", {
                required: true,
                minLength: 6,
                maxLength: 6,
              })}
            />
          </div>
          <Button loading={isLoading} disabled={!isValid} type="submit">
            Update password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
