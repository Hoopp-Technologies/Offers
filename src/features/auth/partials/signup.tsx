import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "@/services";
import { toast } from "sonner";
import { validatePassword } from "@/lib/miniFns";

const Signup = ({ onRegister }: { onRegister: () => void }) => {
  const [seePass, setSeePass] = useState(false);
  const [seeConfirmPass, setSeeConfirmPass] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<{
    emailAddress: string;
    password: string;
    confirmPassword: string;
  }>();

  const onSubmit = async (data: {
    emailAddress: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (!validatePassword(data.password)) return;
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setIsLoading(true);
    const link = `${BASE_URL}ecommerce/auth/register`;

    const response = await fetch(link, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.emailAddress,
        password: data.password,
        firstName: "",
        lastName: "",
        addressRequest: {
          country: "",
          province: "",
          location: "",
          isPrimary: true,
        },
      }),
    });

    if (response.ok) {
      toast.success("Registration successful. Kindly check your mail for OTP");
      setIsLoading(false);
      onRegister();
    } else {
      const result = await response.text();
      toast.error(result);
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-3 mt-9"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className=" grid-cols-2 gap-2 hidden">
        <div>
          <Label className="mb-4" htmlFor="firstName">
            First name
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="John"
            className="mt-2.5"
            // {...register("firstName", { required: true })}
          />
        </div>
        <div>
          <Label className="mb-4" htmlFor="lastName">
            Last name
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Doe"
            className="mt-2.5"
            // {...register("lastName", { required: true })}
          />
        </div>
      </div>
      <div className="relative mb-7">
        <Label className="mb-4" htmlFor="email">
          Email address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          className="mt-2.5"
          {...register("emailAddress", { required: true })}
        />
        <p className="absolute text-xs mt-1.5">
          A One-time-pin (OTP) will be sent for authentication to this email
          address. Please ensure you input the correct email address.
        </p>
      </div>

      <div className="relative mt-4">
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

      <div className="relative">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type={seeConfirmPass ? "text" : "password"}
          placeholder="*********"
          className="mt-2.5"
          onRightIconClick={() => setSeeConfirmPass((prev) => !prev)}
          rightIcon={
            seePass ? (
              <EyeOff className=" text-[#7F7F7F] cursor-pointer" size={18} />
            ) : (
              <Eye className=" text-[#7F7F7F] cursor-pointer" size={18} />
            )
          }
          {...register("confirmPassword", { required: true })}
        />
      </div>

      <Button type="submit" loading={isLoading} disabled={!isValid}>
        Proceed to Register
      </Button>
    </form>
  );
};

export default Signup;
