import Range from "@components/range/range";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-96">
        <Range />
      </div>
    </main>
  );
}
