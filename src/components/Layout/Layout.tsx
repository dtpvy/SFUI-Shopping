import { type ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div test-id="app">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
