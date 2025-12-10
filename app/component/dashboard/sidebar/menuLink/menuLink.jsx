"use client";
import React from "react";
import styles from "./menuLink.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MenuLink({ item }) {
  const pathname = usePathname();
  return (
    <Link
      className={`flex items-center gap-2.5 p-5 rounded-lg my-1.5 ${
        pathname === item.path
          ? "bg-[var(--bgSoft)] cursor-pointer"
          : "bg-[#283342] hover:bg-[var(--bgSoft)] hover:cursor-pointer"
      }`}
      href={item.path}
    >
      {item.icon}
      {item.title}
    </Link>
  );
}

export default MenuLink;
