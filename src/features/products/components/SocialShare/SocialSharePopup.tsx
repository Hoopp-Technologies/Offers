import React, { useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  // TelegramShareButton,
  // EmailShareButton,
  FacebookIcon,
  // TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  XIcon,
  // TelegramIcon,
  // EmailIcon,
} from "react-share";
import { X, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialSharePopupProps {
  url: string;
  title?: string;
  description?: string;
  message?: string;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const SocialSharePopup: React.FC<SocialSharePopupProps> = ({
  url,
  title = "Check out RewardClan!",
  description = "Discover amazing rewards and experiences on RewardClan",
  message,
  isOpen,
  onClose,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  // Use message if provided, otherwise fallback to title
  const shareText = message || title;
  const shareDescription = message || description;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-500">
      <div
        className={cn(
          "bg-white rounded-2xl p-6 max-w-md w-full mx-4 relative shadow-2xl",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Share</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Copy Link Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-1 text-sm text-gray-600 truncate">{url}</div>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center">
            <FacebookShareButton
              url={url}
              hashtag="#RewardClan"
              className="hover:scale-110 transition-transform"
            >
              <FacebookIcon size={48} round />
            </FacebookShareButton>
            <span className="text-xs text-gray-600 mt-2">Facebook</span>
          </div>

          <div className="flex flex-col items-center">
            <TwitterShareButton
              url={url}
              title={shareText}
              hashtags={["RewardClan", "Rewards"]}
              className="hover:scale-110 transition-transform"
            >
              <XIcon size={48} round />
            </TwitterShareButton>
            <span className="text-xs text-gray-600 mt-2">Twitter</span>
          </div>

          <div className="flex flex-col items-center">
            <LinkedinShareButton
              url={url}
              title={shareText}
              summary={shareDescription}
              source="RewardClan"
              className="hover:scale-110 transition-transform"
            >
              <LinkedinIcon size={48} round />
            </LinkedinShareButton>
            <span className="text-xs text-gray-600 mt-2">LinkedIn</span>
          </div>

          <div className="flex flex-col items-center">
            <WhatsappShareButton
              url={url}
              title={shareText}
              separator=" - "
              className="hover:scale-110 transition-transform"
            >
              <WhatsappIcon size={48} round />
            </WhatsappShareButton>
            <span className="text-xs text-gray-600 mt-2">WhatsApp</span>
          </div>

          {/* <div className="flex flex-col items-center">
            <TelegramShareButton
              url={url}
              title={shareText}
              className="hover:scale-110 transition-transform"
            >
              <TelegramIcon size={48} round />
            </TelegramShareButton>
            <span className="text-xs text-gray-600 mt-2">Telegram</span>
          </div>

          <div className="flex flex-col items-center">
            <EmailShareButton
              url={url}
              subject={shareText}
              body={shareDescription}
              className="hover:scale-110 transition-transform"
            >
              <EmailIcon size={48} round />
            </EmailShareButton>
            <span className="text-xs text-gray-600 mt-2">Email</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SocialSharePopup;
