"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [currentShopId, setCurrentShopId] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const savedShopId = localStorage.getItem("currentShopId");
    if (savedShopId) {
      setCurrentShopId(savedShopId);
    }
  }, []);

  const updateShopId = (shopId) => {
    if (isClient) {
      setCurrentShopId(shopId);
      localStorage.setItem("currentShopId", shopId);
      router.push(`/internalDashboard/shops/${shopId}`);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <ShopContext.Provider value={{ currentShopId, updateShopId }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
