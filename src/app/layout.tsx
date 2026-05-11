import { Metadata } from "next";
import { Manrope, Noto_Serif } from "next/font/google";
import { ThemeProvider } from "../providers/ThemeProvider";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lume Studio",
  description:
    "Lume Studio é um estúdio de beleza especializado em cortes de cabelo, coloração e tratamentos estéticos. Com uma equipe de profissionais experientes, oferecemos serviços personalizados para realçar a beleza natural de cada cliente. Agende seu horário e transforme seu visual conosco!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${notoSerif.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
