import Image from "next/image";
import { Inter } from "next/font/google";
import { Red_Hat_Display } from "next/font/google";
import Dashboard from "@/components/Dashboard";

const inter = Inter({ subsets: ["latin"] });
const RedHat = Red_Hat_Display({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className} ${RedHat.className}`}
    >
      <Dashboard />
    </main>
  );
}