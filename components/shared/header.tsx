"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="w-full bg-black py-6 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="w-36">
          <Image
            src="/images/logo.svg"
            width={128}
            height={38}
            alt="Evently logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <SignedIn>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-white hover:text-gray-300 uppercase font-medium text-sm">ABOUT</Link>
            <Link href="/work" className="text-white hover:text-gray-300 uppercase font-medium text-sm">EVENTS</Link>
            <Link href="/events/create" className="text-white hover:text-gray-300 uppercase font-medium text-sm">PROJECTS</Link>
          </nav>
        </SignedIn>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white p-2 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* User Authentication & GitHub Link */}
        <div className="flex items-center gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full text-white border border-white px-4 py-2")}
            >
              Login
            </Link>
          </SignedOut>
          <Link
            href="https://github.com/infinitycoders10"
            target="_blank"
            rel="noreferrer noopener"
            title="Source Code"
          >
            <Image src="/images/github.svg" alt="GitHub" height={25} width={25} />
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 mt-4 py-4 px-4">
          <nav className="flex flex-col space-y-4">
            <Link href="/about" className="text-white hover:text-gray-300 uppercase font-medium text-sm" onClick={() => setMobileMenuOpen(false)}>ABOUT</Link>
            <Link href="/work" className="text-white hover:text-gray-300 uppercase font-medium text-sm" onClick={() => setMobileMenuOpen(false)}>EVENTS</Link>
            <Link href="/events/create" className="text-white hover:text-gray-300 uppercase font-medium text-sm" onClick={() => setMobileMenuOpen(false)}>PROJECTS</Link>
            <SignedOut>
              <Link href="/sign-in" className="text-white hover:text-gray-300 uppercase font-medium text-sm" onClick={() => setMobileMenuOpen(false)}>LOGIN</Link>
            </SignedOut>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;




// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";

// import { buttonVariants } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// import { MobileNav } from "./mobile-nav";
// import { NavItems } from "./nav-items";

// export const Header = () => {
//   return (
//     <header className="w-full border-b">
//       <div className="wrapper flex items-center justify-between">
//         <Link href="/" className="w-36">
//           <Image
//             src="/images/logo.svg"
//             width={128}
//             height={38}
//             alt="Evently logo"
//           />
//         </Link>

//         <SignedIn>
//           <nav className="md:flex-between hidden w-full max-w-xs">
//             <NavItems />
//           </nav>
//         </SignedIn>

//         <div className="flex w-64 items-center justify-end gap-3">
//           <SignedIn>
//             <UserButton afterSignOutUrl="/" />
//             <MobileNav />
//           </SignedIn>
//           <SignedOut>
//             <Link
//               href="/sign-in"
//               className={cn(
//                 buttonVariants({
//                   size: "lg",
//                 }),
//                 "rounded-full"
//               )}
//             >
//               Login
//             </Link>
//           </SignedOut>

//           <Link
//             href="https://github.com/infinitycoders10"
//             target="_blank"
//             rel="noreferrer noopener"
//             title="Source Code"
//           >
//             <Image
//               src="/images/github.svg"
//               alt="github"
//               height={25}
//               width={25}
//             />
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// };