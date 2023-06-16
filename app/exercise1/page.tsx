import { Metadata } from "next";
import Range from "@components/range/range";

export const metadata: Metadata = {
  title: "Interactive Custom Slider | Demo",
  description:
    "Explore this interactive custom slider for a seamless user experience. Easily adjust values and drag min and max values with this intuitive slider component. SEO ready and accessibility in mind.",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-96">
        <Range />
      </div>
    </main>
  );
}
