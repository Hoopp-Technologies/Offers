import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./partials/login";
import Signup from "./partials/signup";
import { useState } from "react";
import OTP from "./partials/otp";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuth } from "@/context";
import ForgotPassword from "./partials/forgot-password";

const Auth = () => {
  const [step, setStep] = useState(1);
  const [tabValue, setTabValue] = useState("login");
  const { showAuth, setShowAuth } = useAuth();

  return (
    <Dialog open={showAuth} onOpenChange={setShowAuth}>
      <DialogContent className="sm:max-w-lg" aria-describedby="Auth Modal">
        <div>
          {step === 1 && (
            <section className="container mx-auto px-6 py-20 min-h-[40vh]">
              <h1 className="text-center font-medium text-2xl">
                Login / Register to Proceed
              </h1>
              <Tabs
                defaultValue={tabValue}
                onValueChange={setTabValue}
                className="w-[400px] mx-auto mt-7"
              >
                <TabsList>
                  <TabsTrigger
                    className="data-[state=active]:bg-[#F158220D] data-[state=active]:text-(--color-primary) px-10"
                    value="login"
                  >
                    Login to RewardClan
                  </TabsTrigger>
                  <TabsTrigger
                    className="data-[state=active]:bg-[#F158220D] data-[state=active]:text-(--color-primary) px-10"
                    value="register"
                  >
                    Register Account
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <Login />
                  <button
                    onClick={() => setStep(3)}
                    className="text-[#494747] mt-2 text-sm hover:underline"
                  >
                    Did you forget your password?
                  </button>
                </TabsContent>
                <TabsContent value="register">
                  <Signup
                    onRegister={() => {
                      setStep(2);
                    }}
                  />
                </TabsContent>
              </Tabs>
            </section>
          )}
          {step === 2 && (
            <OTP
              onReturn={() => {
                setTabValue("register");
                setStep(1);
              }}
              onVerify={() => {
                setTabValue("login");
                setStep(1);
              }}
            />
          )}
          {step === 3 && (
            <ForgotPassword
              onReturn={() => {
                setStep(1);
              }}
              onSuccess={() => setStep(1)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Auth;
