"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const Menu = () => {
  return (
    <nav className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <div className="flex flex-row items-center gap-2">
              <SheetTitle className="text-base font-bold leading-relaxed w-full">
                <Link href="/" className="w-full flex flex-row items-center gap-3">
                  <h2 className="font-title text-lg font-bold leading-relaxed text-slate-800 dark:text-white pt-1">
                    Webhook Forms
                  </h2>
                </Link>
              </SheetTitle>
            </div>
            <ul className="py-6 flex flex-col gap-3">
              <li>
                <Link href="/pricing">
                  <Button variant="ghost" className="w-full">
                    Pricing
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <Button variant="ghost" className="w-full">
                    FAQ
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/reviews">
                  <Button variant="ghost" className="w-full">
                    Reviews
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/signin">
                  <Button className="w-full">
                    Sign In
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <Button variant="outline" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </li>
            </ul>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Menu; 