import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background relative text-foreground">
      <div className="relative flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-28 lg:pt-36">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
