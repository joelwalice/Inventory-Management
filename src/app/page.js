import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <Link href="/home"><p>Inventory Management</p></Link>
    </main>
  );
}
