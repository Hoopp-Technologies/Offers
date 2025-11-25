import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePreferences } from "@/context";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CURRENCIES = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "NGN", label: "NGN - Nigerian Naira" },
];

const COUNTRIES = [
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "NG", label: "Nigeria" },
  { value: "CA", label: "Canada" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
];

const UserPreferences = () => {
  const {
    selectedCurrency,
    setSelectedCurrency,
    selectedCountry,
    setSelectedCountry,
    showPreferences,
    setShowPreferences,
  } = usePreferences();

  const [tempCurrency, setTempCurrency] = useState("");
  const [tempCountry, setTempCountry] = useState("");

  // Initialize temp state when modal opens
  useEffect(() => {
    if (showPreferences) {
      setTempCurrency(selectedCurrency);
      setTempCountry(selectedCountry);
    }
  }, [showPreferences, selectedCurrency, selectedCountry]);

  const handleSave = () => {
    if (tempCurrency && tempCountry) {
      setSelectedCurrency(tempCurrency);
      setSelectedCountry(tempCountry);
      setShowPreferences(false);
    }
  };

  const canSave = tempCurrency && tempCountry;

  return (
    <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
      <DialogContent
        className="sm:max-w-md"
        aria-describedby="User Preferences Modal"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-medium">
            Select Your Preferences
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="currency" className="text-base font-medium">
              Preferred Currency
            </Label>
            <Select value={tempCurrency} onValueChange={setTempCurrency}>
              <SelectTrigger id="currency" className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-base font-medium">
              Country
            </Label>
            <Select value={tempCountry} onValueChange={setTempCountry}>
              <SelectTrigger id="country" className="w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSave}
            disabled={!canSave}
            className="w-full bg-[#F15822] hover:bg-[#d14a1a] text-white"
          >
            Save Preferences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserPreferences;
