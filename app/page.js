import Link from "next/link";
import ButtonSignin from "@/components/ButtonSignin";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function Page() {
  return (
    <>
    <div
  className="h-9 flex flex-row gap-2 flex-wrap items-center justify-center bg-blue-600 text-white text-sm font-semibold text-center py-2 px-6 duration-200"
      >
        <span className="bg-white py-0.5 px-1.5 rounded-lg text-blue-600 text-xs font-bold flex flex-row gap-1 items-center">

          New Update
        </span>
        Now available for Discord! Other integrations coming soon...
      </div>
    <Navigation />
    
      <main>
       <Hero />
       <Problem />
       <Pricing />
       <Footer />
      </main>
    </>
  );
}
