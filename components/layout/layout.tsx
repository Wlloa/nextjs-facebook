import React, { ReactNode } from "react";
import Navbar from "../navbar/navbar";

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div>
      <Navbar/>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
