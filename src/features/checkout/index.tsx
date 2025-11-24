import CartSummary from "../cart/components/CartSummary";
import CheckoutForm from "./components/CheckoutForm";

const CheckoutPage = () => {
  return (
    <main className="container mx-auto px-6 py-8 pt-32">
      <div className="mb-12">
        <h1 className="text-4xl font-semibold mb-3.5">Your cart</h1>
        <p className="text-lg">Your cart is ready for checkout</p>
      </div>
      <div className="grid grid-cols-5 gap-9 pb-12">
        <div className="col-span-5 lg:col-span-3 bg-white rounded-3xl px-12 py-10">
          <h2 className="text-2xl font-semibold mb-10">
            Complete your profile
          </h2>
          <CheckoutForm />
        </div>
        <CartSummary />
      </div>
    </main>
  );
};

export default CheckoutPage;
