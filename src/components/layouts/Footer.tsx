import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { InstagramIcon, LinkedInIcon, FacebookIcon } from "../icons";
import useFilterStore from "@/store/filter";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { setOfferDuration, setIsApplied } = useFilterStore();

  const handleExpiringSoonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOfferDuration("Expiring soon");
    setIsApplied(true);
    navigate("/products");
  };
  console.log(handleExpiringSoonClick);
  return (
    <footer className="bg-white text-black py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Section */}
        <div>
          <h4 className="text-black text-lg font-semibold mb-10">Company</h4>
          <ul>
            <li className="mb-4">
              <Link
                to="/about"
                className="hover:underline hover:text-(--color-primary)"
              >
                About RewardClan
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/#"
                className="hover:underline hover:text-(--color-primary)"
              >
                Create your deals
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/blog"
                className="hover:underline hover:text-(--color-primary)"
              >
                Talk to sales
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/blog"
                className="hover:underline hover:text-(--color-primary)"
              >
                Become a partner
              </Link>
            </li>
          </ul>
        </div>

        {/* Explore Section */}
        <div>
          <h4 className="text-black text-lg font-semibold mb-10">Explore</h4>
          <ul>
            <li className="mb-4">
              <Link
                to="/products"
                className="hover:underline hover:text-(--color-primary)"
              >
                Browse marketplace
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/products?explore=TOP_BRAND"
                className="hover:underline hover:text-(--color-primary)"
              >
                Top brands
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/products?explore=LATEST"
                className="hover:underline hover:text-(--color-primary)"
              >
                Latest Offers
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/products?explore=EXPIRING_SOON"
                // onClick={handleExpiringSoonClick}
                className="hover:underline hover:text-(--color-primary)"
              >
                Expiring soon
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h4 className="text-black text-lg font-semibold mb-10">Support</h4>
          <ul>
            <li className="mb-4">
              <Link
                to="/faq"
                className="hover:underline hover:text-(--color-primary)"
              >
                FAQs
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/contact"
                className="hover:underline hover:text-(--color-primary)"
              >
                Contact support
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/privacy"
                className="hover:underline hover:text-(--color-primary)"
              >
                Report an issue
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/privacy"
                className="hover:underline hover:text-(--color-primary)"
              >
                Privacy Policy
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/privacy"
                className="hover:underline hover:text-(--color-primary)"
              >
                Terms of use
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect Section */}
        <div>
          <h4 className="text-black text-lg font-semibold mb-10">Connect</h4>
          <div className="flex space-x-4 mb-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-(--color-primary)"
            >
              <InstagramIcon className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-(--color-primary)"
            >
              <LinkedInIcon className="h-6 w-6" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-(--color-primary)"
            >
              <FacebookIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div className="container mx-auto px-6 pt-6">
        <p className="text-lg">
          The RewardClan Marketplace serves as an independent discovery platform
          that showcases offers and discounts provided directly by participating
          brands and sellers. RewardClan does not own, sell, or guarantee the
          products or services listed by third parties. All purchases,
          fulfilment, and after-sales support are the responsibility of the
          respective merchants. While RewardClan verifies listed businesses to
          the best of our ability, users are encouraged to review offer details
          carefully before making any purchase or claim.
        </p>
        <p className="text-(--color-muted) mt-6">
          &copy; 2025, Hoopp Technologies Inc
        </p>
      </div>
    </footer>
  );
};

export default Footer;
