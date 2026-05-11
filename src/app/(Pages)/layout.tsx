import "../globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { Toaster } from "sonner";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Toaster richColors closeButton position="top-right" />
      <Footer />
    </>
  );
}
