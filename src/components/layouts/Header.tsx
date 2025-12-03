import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon, CartIcon, PlusCircleIcon } from "../icons";
import { Logo } from "../../assets";
import { Button } from "@/components/ui/button";
import ProfileCard from "./ProfileCard";
import { useCart } from "@/context";
// import { NavigationMenuDemo } from "./NavMenu";

const Header: React.FC = () => {
  const { cartItems } = useCart();
  const navLinks = [
    // {
    //   title: "Categories",
    //   icon: <MenuIcon className="h-5 w-5 mr-1" color="#808080" />,
    //   url: "/categories",
    // },
    {
      title: "Wishlist",
      icon: <HeartIcon className="h-5 w-5 mr-1" color="#808080" />,
      url: "/wishlist",
    },
    {
      title: "Cart",
      icon: (
        <div className="relative">
          <CartIcon className="h-5 w-5 mr-1" color="#808080" />
          {cartItems.length > 0 && (
            <span className="absolute top-[-10px] right-[-8px] bg-red-600 text-white text-[10px] w-[20px] h-[20px] rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </div>
      ),
      url: "/cart",
    },
  ];

  return (
    <section className="fixed w-full z-50 bg-white shadow-sm py-4 px-6">
      <header className=" flex items-center justify-between container mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="logo" className="w-[137px]" />
          </Link>
        </div>

        <div className="flex items-center gap-10">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map(({ icon, title, url }, i) => (
              <Link
                key={i}
                to={url}
                className="flex flex-col items-center text-black hover:underline"
              >
                {icon}
                {title}
              </Link>
            ))}
            <ProfileCard />
          </nav>

          {/* CTA Button */}
          <div>
            <Button className="px-4" size={"lg"}>
              {/* <Link
                to="/auth"
                className="bg-(--color-primary) text-white px-4 rounded-md hover:bg-orange-600"
              > */}
              <a
                href="https://app.rewardclan.com"
                rel="noopener noreferrer"
                target="_blank"
                className="flex gap-2 items-center"
              >
                <PlusCircleIcon />
                Sell on RewardClan
              </a>
              {/* </Link> */}
            </Button>
          </div>
        </div>
      </header>
      {/* <NavigationMenuDemo/> */}
    </section>
  );
};

export default Header;
