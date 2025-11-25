import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
  useEffect,
} from "react";
import { useAuth } from ".";

export type PreferencesContextType = {
  selectedCurrency: string;
  setSelectedCurrency: Dispatch<SetStateAction<string>>;
  selectedCountry: string;
  setSelectedCountry: Dispatch<SetStateAction<string>>;
  showPreferences: boolean;
  setShowPreferences: Dispatch<SetStateAction<boolean>>;
};

const PreferencesDefaults: PreferencesContextType = {
  selectedCurrency: "",
  setSelectedCurrency: () => undefined,
  selectedCountry: "",
  setSelectedCountry: () => undefined,
  showPreferences: false,
  setShowPreferences: () => undefined,
};

export const PreferencesContext = createContext(PreferencesDefaults);

export default function PreferencesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { loggedIn } = useAuth();

  // Initialize from session storage
  const [selectedCurrency, setSelectedCurrency] = useState<string>(() => {
    return sessionStorage.getItem("selectedCurrency") || "";
  });

  const [selectedCountry, setSelectedCountry] = useState<string>(() => {
    return sessionStorage.getItem("selectedCountry") || "";
  });

  const [showPreferences, setShowPreferences] = useState(false);

  // Save to session storage whenever values change
  useEffect(() => {
    if (selectedCurrency) {
      sessionStorage.setItem("selectedCurrency", selectedCurrency);
    }
  }, [selectedCurrency]);

  useEffect(() => {
    if (selectedCountry) {
      sessionStorage.setItem("selectedCountry", selectedCountry);
    }
  }, [selectedCountry]);

  // Auto-show modal when user is not logged in OR preferences are not set
  useEffect(() => {
    const currencyFromSession = sessionStorage.getItem("selectedCurrency");
    const countryFromSession = sessionStorage.getItem("selectedCountry");
    const hasPreferencesInSession = currencyFromSession && countryFromSession;

    if (!Boolean(hasPreferencesInSession)) {
      setShowPreferences(true);
    } else {
      setShowPreferences(false); // Explicitly hide if conditions met
    }
  }, [loggedIn, selectedCurrency, selectedCountry]); // Dependencies are correct to re-evaluate when these change

  return (
    <PreferencesContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency,
        selectedCountry,
        setSelectedCountry,
        showPreferences,
        setShowPreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
