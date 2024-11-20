import Header from "../../_components/header/Header";
import dynamic from "next/dynamic";

const Footer = dynamic(() =>
  import("../../_components/footer/Footer").then((module) => module.default)
);

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
