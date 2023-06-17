import { Metadata } from "next";
import Range from "@components/range";

export const metadata: Metadata = {
  title: "Interactive Fixed Custom Slider | Demo",
  description:
    "Explore this interactive range fixed custom slider for a seamless user experience. Easily adjust values by dragging min and max bullets with this intuitive slider component. SEO ready and developed with accessibility in mind.",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-96">
        <Range isFixedRange={true} />
      </div>
    </main>
  );
}
