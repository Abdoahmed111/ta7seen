import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const user = useUser();
  return (
    <div className="container navbar mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn lg:hidden">
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
            className="dropdown-content menu rounded-box menu-sm mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <Link href="/">الرئيسية</Link>
            </li>
            <li>
              <a>الحصون الخمسة</a>
              <ul className="p-2">
                <li>
                  <a>جدول جديد</a>
                </li>
                <li>
                  <a>جميع الجداول</a>
                </li>
              </ul>
            </li>
            <li>
              <a>الرئيسية</a>
            </li>
          </ul>
        </div>
        <a className="flex cursor-pointer items-center justify-center gap-2 text-xl normal-case">
          <span className="mt-3 text-2xl font-semibold text-primary">
            تحصين القرآن
          </span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">الرئيسية</Link>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>الحصون الخمسة</summary>
              <ul className="p-2">
                <li>
                  <a>جدول جديد</a>
                </li>
                <li>
                  <a>جميع الجداول</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex items-center justify-end gap-2">
        {user.isSignedIn ? (
          <div className="btn-natural btn">
            <SignOutButton>تسجيل الخروج</SignOutButton>
          </div>
        ) : (
          <div className="btn-primary btn">
            <SignInButton>تسجيل الدخول</SignInButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
