import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context";
import { BASE_URL } from "@/services";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

const Login = () => {
  const [seePass, setSeePass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setLoggedIn, setShowAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}ecommerce/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // setAuthToken(result.token);
        localStorage.setItem("token", result.token);
        toast.success("Logged in");
        setIsLoading(false);
        setLoggedIn(true);
        setShowAuth(false)
      } else {
        const error = await response.text();
        toast.error(error);
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error);
      setIsLoading(false);
    }
  };
  return (
    <form
      className="flex flex-col gap-6 mt-9"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="">
        <Label className="mb-4" htmlFor="email">
          Email address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          className="mt-2.5"
          {...register("email", { required: true })}
        />
      </div>

      <div className="relative">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type={seePass ? "text" : "password"}
          placeholder="*********"
          className="mt-2.5"
          onRightIconClick={() => setSeePass((prev) => !prev)}
          rightIcon={
            seePass ? (
              <EyeOff className=" text-[#7F7F7F] cursor-pointer" size={18} />
            ) : (
              <Eye className=" text-[#7F7F7F] cursor-pointer" size={18} />
            )
          }
          {...register("password", { required: true })}
        />
      </div>

      <Button loading={isLoading} disabled={!isValid} type="submit">
        Proceed to Login
      </Button>
    </form>
  );
};

export default Login;
