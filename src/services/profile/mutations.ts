import { createMutation } from "../mutation";

export const useUpdateProfile = createMutation({
  method: "PUT",
  url: "ecommerce/customer/profile",
  keysToRefetch: [["profile"]],
});
