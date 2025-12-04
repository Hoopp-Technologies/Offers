import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BASE_URL } from "@/services";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

const ForgotPassword = ({
  onSuccess,
  onReturn,
}: {
  onSuccess: () => void;
  onReturn: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}ecommerce/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        onSuccess();
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
    <section className="container mx-auto px-6 py-32 pt-24">
      <ArrowLeft
        className="bg-[#E5E9EB] text-[#808080] rounded-full p-1 cursor-pointer"
        size={32}
        onClick={onReturn}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className=" font-medium text-2xl mt-5">Recover your password</h1>
        <div className="flex items-start justify-center flex-col mt-6 w-full">
          <p className="mb-6">
            Enter the email address and we'll send the reset link
          </p>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="mt-2.5 w-[415px]"
            {...register("email", { required: true })}
          />
          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading || !isValid}
            className="mt-6 w-full"
          >
            Send reset link
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ForgotPassword;
