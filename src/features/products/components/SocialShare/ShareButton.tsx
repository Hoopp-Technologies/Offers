import React, { useState } from "react";
import { Share2 } from "lucide-react";
import SocialSharePopup from "./SocialSharePopup";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  url?: string;
  title?: string;
  description?: string;
  message?: string;
  className?: string;
  buttonText?: string;
  variant?: "icon" | "text" | "both";
  size?: "sm" | "md" | "lg";
}

const ShareButton: React.FC<ShareButtonProps> = ({
  url = window.location.href,
  title = "Check out RewardClan!",
  description = "Discover amazing rewards and experiences on RewardClan",
  message,
  className,
  buttonText = "Share",
  variant = "both",
  size = "md",
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const handleShareClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <button
        onClick={handleShareClick}
        className={cn(
          "flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium",
          sizeClasses[size],
          className
        )}
      >
        {(variant === "icon" || variant === "both") && (
          <Share2 size={iconSizes[size]} />
        )}
        {(variant === "text" || variant === "both") && buttonText}
      </button>

      <SocialSharePopup
        url={url}
        title={title}
        description={description}
        message={message}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
    </>
  );
};

export default ShareButton;
