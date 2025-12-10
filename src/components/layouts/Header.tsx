import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  CartIcon,
  PlusCircleIcon,
  MenuIcon,
  UserIcon,
} from "../icons";
import { Logo } from "../../assets";
import { Button } from "@/components/ui/button";
import ProfileCard from "./ProfileCard";
import { useCart, useAuth } from "@/context";
import { X, LogIn, LogOut } from "lucide-react";
// import { NavigationMenuDemo } from "./NavMenu";

const Header: React.FC = () => {
  const { cartItems } = useCart();
  const { loggedIn, setLoggedIn, setShowAuth } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
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

  const profileLinks = [
    {
      title: "Purchase History",
      icon: <CartIcon className="h-5 w-5" color="#808080" />,
      url: "/purchase-history",
      requiresAuth: true,
    },
    {
      title: "My Profile",
      icon: <UserIcon className="h-5 w-5" color="#808080" />,
      url: "/profile",
      requiresAuth: true,
    },
    {
      title: "My Wishlist",
      icon: <HeartIcon className="h-5 w-5" color="#808080" />,
      url: "/wishlist",
      requiresAuth: false,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setMobileMenuOpen(false);
  };

  const handleLogin = () => {
    setShowAuth(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <section className="fixed w-full z-50 bg-white shadow-sm py-4 px-6">
        <header className="flex items-center justify-between container mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src={Logo} alt="logo" className="w-[137px]" />
            </Link>
          </div>

          <div className="flex items-center gap-4 md:gap-10">
            {/* Navigation Links - Desktop */}
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
            <div className="hidden sm:block">
              <Button className="px-4" size={"lg"}>
                <a
                  href="https://app.rewardclan.com"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="flex gap-2 items-center"
                >
                  <PlusCircleIcon />
                  <span className="hidden sm:inline">Sell on RewardClan</span>
                  <span className="sm:hidden">Sell</span>
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </header>
      </section>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-60 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-70 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-semibold text-lg">Menu</span>
          <button
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex flex-col h-[calc(99%-65px)]">
          {/* Navigation Links */}
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map(({ icon, title, url }, i) => (
              <Link
                key={i}
                to={url}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
              >
                {icon}
                <span className="font-medium">{title}</span>
              </Link>
            ))}
          </nav>

          <hr className="mx-4" />

          {/* Profile Section */}
          <div className="flex flex-col p-4 gap-2">
            <span className="text-sm text-gray-500 font-medium px-3 mb-1">
              My Account
            </span>
            {profileLinks.map(({ icon, title, url, requiresAuth }, i) => {
              if (requiresAuth && !loggedIn) return null;
              return (
                <Link
                  key={i}
                  to={url}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                >
                  {icon}
                  <span className="font-medium">{title}</span>
                </Link>
              );
            })}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* CTA Button - Mobile */}
          <div className="p-4 border-t">
            <Button className="w-full" size={"lg"}>
              <a
                href="https://app.rewardclan.com"
                rel="noopener noreferrer"
                target="_blank"
                className="flex gap-2 items-center justify-center w-full"
              >
                <PlusCircleIcon />
                Sell on RewardClan
              </a>
            </Button>
          </div>

          {/* Login/Logout */}
          <div className="p-4 border-t">
            {loggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-red-50 transition-colors text-red-500"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
              >
                <LogIn className="h-5 w-5" />
                <span className="font-medium">Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
