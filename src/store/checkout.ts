import { create } from "zustand";

type CheckoutStore = {
  isValid: boolean;
  profileData: any;
  setIsValid: (isValid: boolean) => void;
  setProfileData: (profileData: any) => void;
};

const useCheckoutStore = create<CheckoutStore>((set) => ({
  isValid: false,
  profileData: null,
  setIsValid: (isValid: boolean) => set({ isValid }),
  setProfileData: (profileData: any) => set({ profileData }),
}));

export default useCheckoutStore;
