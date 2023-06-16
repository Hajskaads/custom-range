import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-96">
        <ul>
          <li className="my-2">
            <Link href="/exercise1">Exercise 1</Link>
          </li>
          <li className="my-2">
            <Link href="/exercise2">Exercise 2</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
