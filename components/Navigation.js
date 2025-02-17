"use client";

import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import Link from "next/link";
import Image from "next/image";
import ButtonSignin from "./ButtonSignin";

const Navigation = () => {
  const [top, setTop] = useState(true);
  const [scrolledUp, setScrolledUp] = useState(false);
  const scrollYRef = useRef(0);
  const cta = <ButtonSignin extraStyle="bg-green-500 hover:bg-green-600 text-white" />;



  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolledUp(currentScrollY < scrollYRef.current);
      setTop(currentScrollY === 0);
      scrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`z-50 fixed top-0 left-0 w-full duration-200 ${
        !scrolledUp && !top ? "sm:-translate-y-9" : ""
      }`}
    >
      <div className="hidden h-9 sm:flex flex-row gap-2 flex-wrap items-center justify-center bg-blue-600 text-white text-sm font-semibold text-center py-2 px-6 duration-200">
        <span className="bg-white py-0.5 px-1.5 rounded-lg text-blue-600 text-xs font-bold flex flex-row gap-1 items-center">
          New Update
        </span>
        Manage your Calendar, Daily Tasks, and Projects effortlessly! Integrations coming soon...
      </div>
      <nav
  className={`min-h-[89px] flex items-center justify-between p-6 duration-200 border-b ${
    top
      ? "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-900" // Ajout d'un fond en mode mobile
      : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-900"
  }`}
>

        {/* Logo and Brand */} 
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/icon.png" 
              alt="Logo" 
              width={40} 
              height={40}
              className="w-10 h-10"
            />
            <h2 className="font-title text-xl font-bold leading-relaxed text-slate-800 dark:text-white">
              FlowlyTasker
            </h2>
          </Link>
        </div>

        {/* Desktop Navigation */}
    {/* Desktop Navigation */}
<div className="hidden md:flex items-center gap-8 absolute left-1/2 translate-x-[-50%]">
  <Link 
    href="/pricing" 
    className="text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
  >
    Pricing
  </Link>
  <Link 
    href="/faq" 
    className="text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
  >
    FAQ
  </Link>
  <Link 
    href="/reviews" 
    className="text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
  >
    Reviews
  </Link>
</div>


        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
        {cta}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Menu />
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
