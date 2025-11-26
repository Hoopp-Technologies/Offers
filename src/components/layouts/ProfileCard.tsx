import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../ui/hover-card";
import { CartIcon, HeartIcon, UserIcon } from "../icons";
import { Link } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context";

const ProfileCard = () => {
  const [open, setOpen] = useState(false);
  const { setLoggedIn, loggedIn, setShowAuth } = useAuth();
  return (
    <div>
      <HoverCard openDelay={1} open={open} onOpenChange={setOpen}>
        <HoverCardTrigger>
          <div className="flex flex-col items-center text-black hover:text-[#F15822]">
            <UserIcon className="h-5 w-5 mr-1" color="#808080" />
            My Profile
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="pt-6 px-0">
          <div className="flex flex-col gap-1.5 px-2 pb-3">
            {loggedIn && (
              <>
                <Link
                  to="/purchase-history"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                >
                  <CartIcon className="h-5 w-5 mr-1" color="#808080" /> Purchase
                  History
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                >
                  <UserIcon className="h-5 w-5 mr-1" color="#808080" /> My
                  Profile
                </Link>
              </>
            )}
            <Link
              to="/wishlist"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-md cursor-pointer"
            >
              <HeartIcon className="h-5 w-5 mr-1" color="#808080" /> My Wishlist
            </Link>
          </div>
          <hr />
          <p
            onClick={() => {
              if (!loggedIn) {
                setShowAuth(true);
                return;
              }
              localStorage.removeItem("token");
              setLoggedIn(false);
              setOpen(false);
            }}
            className="text-red-500 cursor-pointer flex items-center gap-3 px-4 pt-2"
          >
            {loggedIn ? (
              <>
                <LogOut className="h-5 w-5 mr-1" /> Logout
              </>
            ) : (
              <>
                <LogIn className="h-5 w-5 mr-1" /> Login
              </>
            )}
          </p>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
  0;
};

export default ProfileCard;
