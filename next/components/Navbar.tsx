import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function Navbar() {
  const router = useRouter();
  const { pathname } = router;
  console.log(router.pathname);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0"></div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline text-white">
                <Link
                  href="/"
                  className={
                    pathname === "/" ? "nav-btn-active" : "nav-btn-not-active"
                  }
                >
                  Home
                </Link>
                <Link
                  href="/implants"
                  className={
                    pathname === "/implants"
                      ? "nav-btn-active"
                      : "nav-btn-not-active"
                  }
                >
                  Implants
                </Link>
                <Link
                  href="/variables"
                  className={
                    pathname === "/variables"
                      ? "nav-btn-active"
                      : "nav-btn-not-active"
                  }
                >
                  Development Variables
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}
