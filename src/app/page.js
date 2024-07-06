import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-5">
      <h1 className="flex justify-center text-xl md:text-3xl text-green-600 font-semibold">Inventory Management</h1>
      <button className="rounded-lg bg-red-500 text-white p-2 border-0 shadow-lg">
        <Link href="/login" className="flex items-center justify-center text-2xl ">
          Login
        </Link>
      </button>
    </div>
  );
}
