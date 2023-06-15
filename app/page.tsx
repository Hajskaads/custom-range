"use client";

import NormalRange from "@components/customRange/normalRange/normalRange";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-96">
        <NormalRange />
      </div>
    </main>
  );
}
