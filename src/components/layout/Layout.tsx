import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  /** Extra class on the page shell (the homepage uses it for its burgundy menu bar and footer) */
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className={`min-h-screen flex flex-col bg-background relative text-foreground${className ? ` ${className}` : ""}`}>
      <div className="relative flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-[85px] md:pt-20">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
