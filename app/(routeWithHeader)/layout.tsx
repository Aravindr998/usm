import Header from "@/components/Header";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className="font-bitcount">
  <Header />
  <section className="mt-20">
    {children}
  </section>
  </main>;
};

export default layout;
