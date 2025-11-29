import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateProfile } from "@/services/profile/mutations";
import type { ProfileData } from "@/services/profile/types";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { COUNTRIES } from "@/features/checkout/components/CheckoutForm";
import { State } from "country-state-city";

type PersonalDetailsFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  deliveryCountry: string;
  deliveryState: string;
  deliveryZipCode: string;
  deliveryAddress: string;
  isPrimary: boolean;
  billingCountry: string;
  billingState: string;
  billingZipCode: string;
  billingAddress: string;
};

const PersonalDetails = ({
  data,
  isRefetching,
}: {
  data?: ProfileData;
  isRefetching: boolean;
}) => {
  const [isBilling, setIsBilling] = useState(true);
  const { mutateAsync, isPending } = useUpdateProfile({
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  const primaryAddress = data?.addresses.find((addy) => addy.isPrimary);

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<PersonalDetailsFormData>({
      defaultValues: {
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        email: data?.email || "",
        phoneNumber: data?.phoneNumber || "",
        gender: data?.gender || "",
        deliveryCountry:
          COUNTRIES.find((country) => country.name === primaryAddress?.country)
            ?.code || "",
        deliveryState: primaryAddress?.province || "",
        deliveryZipCode: primaryAddress?.zipCode || "",
        deliveryAddress: primaryAddress?.location || "",
        isPrimary: true,
        billingCountry: "",
        billingState: "",
        billingZipCode: "",
        billingAddress: "",
      },
    });

  // Update form values when data changes
  useEffect(() => {
    if (data) {
      const primaryAddress = data.addresses.find((addy) => addy.isPrimary);
      reset({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
        gender: data.gender || "",
        deliveryCountry:
          COUNTRIES.find((country) => country.name === primaryAddress?.country)
            ?.code || "",
        deliveryState: primaryAddress?.province || "",
        deliveryZipCode: primaryAddress?.zipCode || "",
        deliveryAddress: primaryAddress?.location || "",
        isPrimary: true,
        billingCountry: "",
        billingState: "",
        billingZipCode: "",
        billingAddress: "",
      });
    }
  }, [data, reset]);

  const onSubmit = (formData: PersonalDetailsFormData) => {
    mutateAsync({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      gender: formData.gender,
      primaryAddress: {
        country: COUNTRIES.find(
          (country) => country.code === formData.deliveryCountry
        )?.name,
        province: formData.deliveryState,
        location: formData.deliveryAddress,
        zipCode: formData.deliveryZipCode,
        isPrimary: formData.isPrimary,
      },
    });
  };

  const selectedCountry = watch("deliveryCountry");

  // Get states for selected country
  const states = useMemo(() => {
    if (!selectedCountry) return [];
    return State.getStatesOfCountry(selectedCountry);
  }, [selectedCountry]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("", isRefetching && "opacity-40")}
    >
      <div className="grid grid-cols-5 gap-6 px-12 pb-11">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-6">Personal Details</h2>
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                className="rounded-md"
                {...register("firstName")}
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                className="rounded-md"
                {...register("lastName")}
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="rounded-md"
                {...register("email")}
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="phoneNumber">Phone number</Label>
              <Input
                id="phoneNumber"
                type="text"
                placeholder="Enter your phone number"
                className="rounded-md"
                {...register("phoneNumber")}
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={watch("gender")}
                onValueChange={(value) => setValue("gender", value)}
              >
                <SelectTrigger className="shadow-none h-auto py-2.5">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-5 gap-6 px-12 py-11">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-6">Delivery address</h2>
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col">
              <Label htmlFor="deliveryCountry">Country</Label>
              <Select
                value={watch("deliveryCountry")}
                onValueChange={(value) => setValue("deliveryCountry", value)}
              >
                <SelectTrigger className="shadow-none h-auto py-2.5">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="deliveryState">State</Label>
              <Select
                value={watch("deliveryState")}
                onValueChange={(value) => setValue("deliveryState", value)}
                disabled={!selectedCountry || states.length === 0}
              >
                <SelectTrigger className="shadow-none h-auto py-2.5">
                  <SelectValue
                    placeholder={
                      !selectedCountry
                        ? "Select country first"
                        : states.length === 0
                        ? "No states available"
                        : "Select state"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] overflow-y-scroll">
                  {states.map((state) => (
                    <SelectItem key={state.isoCode} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="deliveryZipCode">Zip code</Label>
              <Input
                id="deliveryZipCode"
                type="text"
                placeholder="Enter your zip code"
                className="rounded-md"
                {...register("deliveryZipCode")}
              />
            </div>
            <div className="flex flex-col col-span-3">
              <Label htmlFor="deliveryAddress">Address</Label>
              <Input
                id="deliveryAddress"
                type="text"
                placeholder="Enter your address"
                className="rounded-md"
                {...register("deliveryAddress")}
              />
            </div>
            <div className="flex items-center gap-3 col-span-3 -mt-2">
              <Checkbox
                className="data-[state=checked]:border-[#F15822] data-[state=checked]:bg-[#F15822] data-[state=checked]:text-white dark:data-[state=checked]:border-[#F15822] dark:data-[state=checked]:bg-[#F15822] rounded-full p-0.5 h-4.5 w-4.5"
                id="terms"
                checked={isBilling}
                onCheckedChange={() => setIsBilling((prev) => !prev)}
              />
              <Label
                className="mb-0 text-gray-600 cursor-pointer"
                htmlFor="terms"
              >
                Same as billing address
              </Label>
            </div>
          </div>
        </div>
      </div>
      {!isBilling && (
        <>
          <hr />
          <div className="grid grid-cols-5 gap-6 px-12 py-11">
            <div className="col-span-2">
              <h2 className="text-xl font-semibold mb-6">Billing address</h2>
            </div>
            <div className="col-span-3">
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <Label htmlFor="billingCountry">Country</Label>
                  <Select
                    value={watch("billingCountry")}
                    onValueChange={(value) => setValue("billingCountry", value)}
                  >
                    <SelectTrigger className="shadow-none h-auto py-2.5">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nigeria">Nigeria</SelectItem>
                      <SelectItem value="ghana">Ghana</SelectItem>
                      <SelectItem value="kenya">Kenya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="billingState">State</Label>
                  <Select
                    value={watch("billingState")}
                    onValueChange={(value) => setValue("billingState", value)}
                  >
                    <SelectTrigger className="shadow-none h-auto py-2.5">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lagos">Lagos</SelectItem>
                      <SelectItem value="abuja">Abuja</SelectItem>
                      <SelectItem value="kano">Kano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="billingZipCode">Zip code</Label>
                  <Input
                    id="billingZipCode"
                    type="text"
                    placeholder="Enter your zip code"
                    className="rounded-md"
                    {...register("billingZipCode")}
                  />
                </div>
                <div className="flex flex-col col-span-3">
                  <Label htmlFor="billingAddress">Address</Label>
                  <Input
                    id="billingAddress"
                    type="text"
                    placeholder="Enter your address"
                    className="rounded-md"
                    {...register("billingAddress")}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="px-12">
        <Button
          type="submit"
          disabled={isPending}
          className=" ml-auto mt-12"
          loading={isPending}
        >
          Update Profile
        </Button>
      </div>
    </form>
  );
};

export default PersonalDetails;
