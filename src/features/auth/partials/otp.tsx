import { ArrowLeft } from "lucide-react";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";
import { BASE_URL } from "@/services";
import { toast } from "sonner";

const OTP = ({
  onReturn,
  onVerify,
}: {
  onReturn: () => void;
  onVerify: () => void;
}) => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}ecommerce/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: value,
        }),
      });

      if (response.ok) {
        toast.success("Email successfully verified. You can now log in.");
        setIsLoading(false);
        onVerify();
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
    <section className="container mx-auto px-6 py-32">
      <ArrowLeft
        className="bg-[#E5E9EB] text-[#808080] rounded-full p-1 cursor-pointer"
        size={32}
        onClick={onReturn}
      />
      <h1 className="text-center font-medium text-2xl mt-5">
        Verify your email address
      </h1>
      <div className="flex items-center justify-center flex-col mt-6">
        <p className="mb-6">Enter the 6-digit OTP code</p>

        <InputOTP
          pattern={REGEXP_ONLY_DIGITS}
          maxLength={6}
          className=""
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPSlot
            index={0}
            className="first:rounded-none h-14 w-14 text-2xl"
          />
          <InputOTPSlot index={1} className="h-14 w-14 text-2xl" />
          <InputOTPSlot index={2} className="h-14 w-14 text-2xl" />
          <InputOTPSlot index={3} className="h-14 w-14 text-2xl" />
          <InputOTPSlot index={4} className="h-14 w-14 text-2xl" />
          <InputOTPSlot
            index={5}
            className="last:rounded-none h-14 w-14 text-2xl"
          />
        </InputOTP>
        <Button
          onClick={() => {
            onSubmit();
          }}
          loading={isLoading}
          disabled={isLoading}
          className="mt-12 w-4/5"
        >
          Verify OTP
        </Button>
      </div>
    </section>
  );
};

export default OTP;
