import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CheckoutForm = () => {
  return (
    <form action="" className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="rounded-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col">
          <Label htmlFor="name">Country</Label>
          <Select>
            <SelectTrigger className="shadow-none h-auto py-2.5">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-1">Nigeria</SelectItem>
              <SelectItem value="name-2">Ghana</SelectItem>
              <SelectItem value="name-3">Ghana</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <Label htmlFor="email">State</Label>
          <Select>
            <SelectTrigger className="shadow-none h-auto py-2.5">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-1">Nigeria</SelectItem>
              <SelectItem value="name-2">Ghana</SelectItem>
              <SelectItem value="name-3">Ghana</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <Label htmlFor="email">Zip code</Label>
          <Input
            id="email"
            type="text"
            placeholder="Enter your zip code"
            className="rounded-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 w-full">
        <div className="flex flex-col">
          <Label htmlFor="name">Delivery address</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your delivery address"
            className="rounded-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col">
          <Label htmlFor="email">Phone number</Label>
          <Input
            id="email"
            type="text"
            placeholder="Enter your phone number"
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="email">Gender</Label>
          <Select>
            <SelectTrigger className="shadow-none h-auto py-2.5">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-1">Male</SelectItem>
              <SelectItem value="name-2">Female</SelectItem>
              <SelectItem value="name-3">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
