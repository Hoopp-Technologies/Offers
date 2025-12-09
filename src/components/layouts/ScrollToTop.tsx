// src/components/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname, searchParams]);

  return null;
}
