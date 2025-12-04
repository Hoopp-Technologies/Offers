import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth, useCart, usePreferences } from "@/context";
import { useCheckout } from "@/services/products/mutations";
import { getCurrencySymbol } from "@/utils/textUtils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { transformCart } from "../utils";
import type { PayloadType } from "@/services/mutation";
//@ts-ignore
import PaystackPop from "@paystack/inline-js";
import { useGetCart } from "@/services/products/queries";
import useCheckoutStore from "@/store/checkout";

const CartSummary = () => {
  const { cartTotal, cartItems, cartId, setCartId } = useCart();
  const { loggedIn, setShowAuth } = useAuth();
  const navigate = useNavigate();
  const { data: cart, refetch: refetchCart } = useGetCart({
    enabled: false,
  });
  const { isValid, profileData } = useCheckoutStore((state) => state);

  const { mutate: checkout, isPending } = useCheckout({
    onSuccess(data) {
      refetchCart();
      setCartId(cart?.cartId as number);
      const popup = new PaystackPop();
      const trans = popup.resumeTransaction(data.accessCode);
      trans.onSuccess = (trans: any) => {
        console.log(trans);
        toast.success("Checkout successful");
        navigate(`/purchase-success?transactionId=${data.transactionId}`);
      };
      trans.onError = () => {
        toast.error("Payment failed");
      };
    },
  });
  // access code = 6tw1zo4ybbao65f
  const pathname = useLocation().pathname;
  const isCheckoutPage = pathname.includes("checkout");

  const { selectedCurrency } = usePreferences();
  const savedDiscount = cartItems?.reduce(
    (total, item) =>
      total +
      ((item?.price?.originalPrice ?? item.originalPrice ?? 0) -
        (item?.price?.discountedPrice ?? item.discountedPrice ?? 0)) *
        item?.quantity,
    0
  );
  console.log({ profileData, isValid });

  const handleCheckout = () => {
    if (!isCheckoutPage) return;
    const checkoutObject = transformCart(cartItems, cartId);
    checkout(checkoutObject as unknown as PayloadType);
  };

  return (
    <div className="col-span-5 lg:col-span-2">
      <div className="bg-white pt-8 rounded-lg">
        <div className="border-b px-8 pb-6">
          <p className=" font-bold">Cart summary</p>
          <div className=" mt-7 space-y-4">
            <div className="flex items-center justify-between">
              <p>Cart subtotal</p>
              <p className=" font-semibold">
                {getCurrencySymbol(selectedCurrency)}
                {cartTotal.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p>Discount</p>
              <p className=" font-semibold">
                -{getCurrencySymbol(selectedCurrency)}
                {savedDiscount.toLocaleString()}
              </p>
            </div>
          </div>
          {/* <div className="flex justify-end">
                  <p className=" px-3 py-0.5 text-xs bg-[#73BF451A] rounded-full mt-4.5">
                    You are saving 20%
                  </p>
                </div> */}
        </div>
        <div className="px-8 py-5 border-b pr-12">
          <p className=" font-bold">Choose payment method</p>

          <RadioGroup
            defaultValue={
              selectedCurrency !== "NGN" ? "option-one" : "option-two"
            }
          >
            {selectedCurrency !== "NGN" && (
              <div className="flex items-start space-x-2 mt-5">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one" className="cursor-pointer">
                  <div className="">
                    <p className="font-medium mb-2">Pay with Stripe</p>
                    <p className="text-sm text-(--color-muted)">
                      Stripe processes VISA, Mastercard, Google Pay and more.
                      1.5% processing fee will apply to your order.
                    </p>
                  </div>
                </Label>
              </div>
            )}
            {selectedCurrency === "NGN" && (
              <div className="flex items-start space-x-2 mt-5">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two" className="cursor-pointer">
                  <div className="">
                    <p className=" font-medium mb-2">Pay with Paystack</p>
                    <p className="text-sm text-(--color-muted)">
                      Paystack is the preferred payment option for Nigerians and
                      other African countries who want to enjoy mobile money,
                      bank transfer or USSD payment options.
                    </p>
                  </div>
                </Label>
              </div>
            )}
          </RadioGroup>
        </div>
        <div className=" py-6 px-8">
          <div className="flex items-center justify-between mb-5">
            <p>Cart Total</p>
            <p className=" font-semibold">₦{cartTotal.toLocaleString()}</p>
          </div>
          {!loggedIn ? (
            <Button
              onClick={() => setShowAuth(true)}
              className="rounded-full text-lg py-6 w-full"
              size={"lg"}
            >
              Login to Proceed
            </Button>
          ) : (
            <Button
              onClick={handleCheckout}
              loading={isPending}
              disabled={isPending || (isCheckoutPage && isValid)}
              className="rounded-full text-lg py-6 w-full"
              size={"lg"}
            >
              <Link to={"/checkout"}>Proceed to Checkout</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
