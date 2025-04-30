"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeToggle } from "./theme-toggle";
import ProductList from "./products/page";

export default function Home() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="min-h-screen  relative p-4">
      {/* Theme Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Product List */}
      <div>
        <ProductList />
      </div>
    </div>
  );
}
