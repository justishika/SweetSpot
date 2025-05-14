import { useState, useEffect } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top fixed bottom-8 right-8 bg-primary hover:bg-primary-dark text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md z-50 ${
        isVisible ? "visible" : ""
      }`}
      aria-label="Back to top"
    >
      <i className="ri-arrow-up-line text-lg"></i>
    </button>
  );
}
