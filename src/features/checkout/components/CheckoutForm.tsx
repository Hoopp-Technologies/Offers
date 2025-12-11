import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetProfile } from "@/services/profile/queries";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { State } from "country-state-city";
import useCheckoutStore from "@/store/checkout";

// Define 5 constant countries
export const COUNTRIES = [
  { code: "NG", name: "Nigeria" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "DE", name: "Germany" },
];

interface CheckoutFormData {
  fullName: string;
  email: string;
  country: string;
  state: string;
  zipCode: string;
  deliveryAddress: string;
  phoneNumber: string;
  gender: string;
}

const CheckoutForm = () => {
  const { data: profileData, isLoading, isRefetching } = useGetProfile();
  const { setProfileData: setCheckoutProfileData, setIsValid } =
    useCheckoutStore((state) => state);

  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      country: "",
      state: "",
      zipCode: "",
      deliveryAddress: "",
      phoneNumber: "",
      gender: "",
    },
  });

  const selectedCountry = watch("country");

  // Get states for selected country
  const states = useMemo(() => {
    if (!selectedCountry) return [];
    return State.getStatesOfCountry(
      COUNTRIES.find((country) => country.name === selectedCountry)?.code
    );
  }, [selectedCountry]);

  // Preload form data from profile
  useEffect(() => {
    if (profileData) {
      const primaryAddress = profileData.addresses.find(
        (address) => address.isPrimary
      );

      setValue("fullName", `${profileData.firstName} ${profileData.lastName}`);
      setValue("email", profileData.email);
      setValue("phoneNumber", profileData.phoneNumber);
      setValue("gender", profileData.gender);
      // If addresses exist, use the first one
      if (profileData.addresses && profileData.addresses.length > 0) {
        setValue("deliveryAddress", primaryAddress?.location ?? "");
        setValue(
          "country",
          COUNTRIES.find((country) => country.name === primaryAddress?.country)
            ?.name ?? ""
        );
        setValue("state", primaryAddress?.province ?? "");
        setValue("zipCode", primaryAddress?.zipCode ?? "");
      }
    }
  }, [profileData, setValue, isLoading, isRefetching]);

  useEffect(() => {
    setIsValid(isValid);
    if (isValid) {
      setCheckoutProfileData({
        fullName: watch("fullName"),
        email: watch("email"),
        phoneNumber: watch("phoneNumber"),
        gender: watch("gender"),
        deliveryAddress: watch("deliveryAddress"),
        country: watch("country"),
        state: watch("state"),
        zipCode: watch("zipCode"),
      });
    }
  }, [watch, isValid]);

  // Reset state when country changes
  useEffect(() => {
    setValue("state", "");
  }, [selectedCountry, setValue]);

  if (isLoading) {
    return <div className="text-center py-8">Loading form...</div>;
  }

  return (
    <form action="" className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your name"
            className="rounded-md"
            {...register("fullName", { required: "Full name is required" })}
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="rounded-md"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <Label htmlFor="country">Country</Label>
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="shadow-none h-auto py-2.5">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.code} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.country && (
            <span className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <Label htmlFor="state">State/Province</Label>
          <Controller
            name="state"
            control={control}
            rules={{ required: "State is required" }}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
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
            )}
          />
          {errors.state && (
            <span className="text-red-500 text-sm mt-1">
              {errors.state.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <Label htmlFor="zipCode">Zip code</Label>
          <Input
            id="zipCode"
            type="text"
            placeholder="Enter your zip code"
            className="rounded-md"
            {...register("zipCode", { required: "Zip code is required" })}
          />
          {errors.zipCode && (
            <span className="text-red-500 text-sm mt-1">
              {errors.zipCode.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 w-full">
        <div className="flex flex-col">
          <Label htmlFor="deliveryAddress">Delivery address</Label>
          <Input
            id="deliveryAddress"
            type="text"
            placeholder="Enter your delivery address"
            className="rounded-md"
            {...register("deliveryAddress", {
              required: "Delivery address is required",
            })}
          />
          {errors.deliveryAddress && (
            <span className="text-red-500 text-sm mt-1">
              {errors.deliveryAddress.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col">
          <Label htmlFor="phoneNumber">Phone number</Label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="Enter your phone number"
            className="rounded-md"
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <Label htmlFor="gender">Gender</Label>
          <Controller
            name="gender"
            control={control}
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="shadow-none h-auto py-2.5">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.gender && (
            <span className="text-red-500 text-sm mt-1">
              {errors.gender.message}
            </span>
          )}
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
