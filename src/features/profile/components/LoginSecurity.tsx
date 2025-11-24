import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginSecurity = () => {
  return (
    <div className="">
      <div className="grid grid-cols-5 gap-6 px-12 pb-11">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-6">Update your password</h2>
        </div>
        <div className="col-span-3 flex flex-col gap-6">
          <div className="flex flex-col">
            <Label htmlFor="name">Enter current password</Label>
            <Input
              id="name"
              type="password"
              placeholder="Enter your current password"
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="name">Enter new password</Label>
            <Input
              id="name"
              type="password"
              placeholder="Enter your new password"
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="name">Confirm new password</Label>
            <Input
              id="name"
              type="password"
              placeholder="Enter your confirm new password"
              className="rounded-md"
            />
          </div>
          <Button size={"lg"} className="w-full">
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginSecurity;
