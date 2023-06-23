
 

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const user = useUser();
  return (
    <div class="container navbar mx-auto">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabIndex={0} class="btn-ghost btn lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            class="dropdown-content menu rounded-box menu-sm mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <Link href="/">الرئيسية</Link>
            </li>
            <li>
              <a>الحصون الخمسة</a>
              <ul class="p-2">
                <li>
                  <Link href="/weeks/create">جدول جديد</Link>
                </li>
                <li>
                  <Link href={"/weeks"}>جميع الجداول</Link>
                </li>
              </ul>
            </li>
            <li>
              <a>الرئيسية</a>
            </li>
          </ul>
        </div>
        <a class="flex cursor-pointer items-center justify-center gap-2 text-xl normal-case">
          <span class="mt-3 text-2xl font-semibold text-primary">
            تحصين القرآن
          </span>
        </a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li>
            <Link href="/">الرئيسية</Link>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>الحصون الخمسة</summary>
              <ul class="p-2">
                <li>
                  <Link href="/weeks/create">جدول جديد</Link>
                </li>
                <li>
                  <Link href={"/weeks"}>جميع الجداول</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div class="navbar-end flex items-center justify-end gap-2">
        {user.isSignedIn ? (
          <div class="btn-natural btn">
            <SignOutButton>تسجيل الخروج</SignOutButton>
          </div>
        ) : (
          <div class="btn-primary btn">
            <SignInButton>تسجيل الدخول</SignInButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
