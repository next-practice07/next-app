"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeToggle } from "./theme-toggle";
import ProductList from "./products/page";
import SalesByCategoryChart from "@/components/salesByCategoryChart";

export default function Home() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="min-h-screen  relative p-4">
      {/* Theme Toggle Button */}
      

      {/* Product List */}
      <div>
        {/* <SalesByCategoryChart /> */}
        <ProductList />
      </div>
    </div>
  );
}
