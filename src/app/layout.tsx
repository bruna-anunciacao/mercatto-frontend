// Components

// Imports
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { PrimeReactProvider } from 'primereact/api';
import { Toaster } from "react-hot-toast";
// Styles
import "../styles/globals.scss";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mercatto",
  description: "Mercatto is a marketplace for buying and selling goods.",
  icons: "/mercatto-logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${montserrat.variable}`}>
        <PrimeReactProvider >
          <Toaster />
          {children}
        </PrimeReactProvider>
      </body>
    </html>
  );
}
