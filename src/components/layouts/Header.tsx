import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon, CartIcon, PlusCircleIcon } from "../icons";
import { Logo } from "../../assets";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context";
import { cn } from "@/lib/utils";
import ProfileCard from "./ProfileCard";
// import { NavigationMenuDemo } from "./NavMenu";

const Header: React.FC = () => {
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
      icon: <CartIcon className="h-5 w-5 mr-1" color="#808080" />,
      url: "/cart",
    },
  ];

  const { setShowAuth, loggedIn } = useAuth();
  return (
    <section className="fixed w-full z-50">
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
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
            {true && <ProfileCard />}
          </nav>

          {/* CTA Button */}
          <div className={cn("", loggedIn && "hidden")}>
            <Button
              className="px-4"
              size={"lg"}
              onClick={() => setShowAuth(true)}
            >
              {/* <Link
                to="/auth"
                className="bg-(--color-primary) text-white px-4 rounded-md hover:bg-orange-600"
              > */}
              <PlusCircleIcon />
              Sell on RewardClan
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
