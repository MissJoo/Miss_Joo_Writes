import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "@/components/home/home-burgundy.css";
import "@/styles/type-preview.css";

interface LayoutProps {
  children: ReactNode;
  /** Extra class on the page shell (the homepage uses it for its burgundy menu bar and footer) */
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className={`min-h-screen flex flex-col bg-background relative text-foreground${className ? ` ${className}` : ""} hb-home`}>
      <div className="relative flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-[85px] md:pt-20">
          {/* Brand palette and typography on every page */}
          <div className="type-preview">
            <div className="hb-page">{children}</div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
