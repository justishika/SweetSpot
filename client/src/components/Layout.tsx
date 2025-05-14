import { useEffect, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./BackToTop";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
