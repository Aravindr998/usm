import React from "react";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <section className="font-bitcount">
    {children}
    </section>;
};

export default AuthLayout;
