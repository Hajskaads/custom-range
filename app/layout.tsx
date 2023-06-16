import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Interactive Custom Sliders | Demo Next App",
  description:
    "Explore this two interactive custom sliders for a seamless user experience. The first slider is continous, while the second has fixed ranges of available values. Easily adjust values and drag min and max values with this intuitive sliders components. SEO ready and developed with accessibility in mind.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
