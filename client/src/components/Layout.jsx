import { useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./BackToTop";

export default function Layout({ children }) {
  // Set page title on component mount
  useEffect(() => {
    document.title = "SweetSpot - Artisan Dessert Marketplace";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}; 