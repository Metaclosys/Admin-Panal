"use client";
import React, { useState, useEffect, useMemo } from "react";
import { MdOutlineTranslate } from "react-icons/md";
import { Select } from "antd";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { API_ENDPOINTS, apiCall } from "../../../../api/apiContent/apiContent";
import { useShop } from "../../../../context/ShopContext";

function RightSide() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState("");
  const [greeting, setGreeting] = useState("");
  const { currentShopId, updateShopId } = useShop();
  const { data: session } = useSession();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const roles = useMemo(() => {
    if (Array.isArray(session?.user?.roles)) {
      return session.user.roles;
    }
    if (session?.user?.role) {
      return [session.user.role];
    }
    return [];
  }, [session?.user?.roles, session?.user?.role]);

  const isReservationist = roles.includes("reservationist");

  // Fetch shops using session token
  useEffect(() => {
    const fetchShops = async () => {
      if (isReservationist) {
        setShops([]);
        setLoading(false);
        return;
      }

      if (session?.accessToken) {
        try {
          setLoading(true);
          const data = await apiCall(API_ENDPOINTS.LOCATIONS.BASE, {
            headers: {
              Authorization: `Bearer ${session.accessToken}`
            }
          });
          console.log("Shops fetched:", data);
          setShops(data);
        } catch (err) {
          console.error("Error fetching shops:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchShops();
  }, [session?.accessToken, isReservationist]);

  useEffect(() => {
    // Initialize time and greeting only on client side
    const updateTimeAndGreeting = () => {
      const now = new Date();
      const hours = now.getHours();

      // Format time in 12-hour format to avoid locale issues
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      // Set greeting based on time of day
      let greetingText = "Good Morning";
      if (hours >= 12 && hours < 17) {
        greetingText = "Good Afternoon";
      } else if (hours >= 17) {
        greetingText = "Good Evening";
      }

      setCurrentTime(timeString);
      setGreeting(greetingText);
    };

    // Initial update
    updateTimeAndGreeting();

    // Update every minute instead of every second to reduce renders
    const timer = setInterval(updateTimeAndGreeting, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleDashboardChange = (value) => {
    if (value === "dashboard") {
      router.push("/dashboard");
    } else {
      const shopId = value.split("/").pop();
      updateShopId(shopId);
      router.push(`/internalDashboard/shops/${shopId}`);
    }
  };

  const handleLanguageChange = (value) => {
    console.log(`selected language: ${value}`);
  };

  const languageOptions = [
    {
      key: "1",
      value: "en-US",
      label: "English (US)",
    },
    {
      key: "2",
      value: "es",
      label: "Español",
    },
    {
      key: "3",
      value: "fr",
      label: "Français",
    },
  ];

  // Create dashboard options including the main dashboard and shops
  const dashboardOptions = useMemo(() => {
    if (isReservationist) {
      return [];
    }
    return [
      {
        key: "main",
        value: "dashboard",
        label: "Main Dashboard",
      },
      ...shops.map((shop) => ({
        key: shop._id,
        value: `internalDashboard/shops/${shop._id}`,
        label: `${shop.name} Dashboard`,
      })),
    ];
  }, [isReservationist, shops]);

  return (
    <div className="flex items-center gap-8 ml-auto">
      {!isReservationist && (
        <Select
          size="large"
          placeholder={loading ? "Loading dashboards..." : "Select dashboard"}
          onChange={handleDashboardChange}
          className="border-none bg-transparent text-sm min-w-[200px]"
          options={dashboardOptions}
          value={currentShopId ? `internalDashboard/shops/${currentShopId}` : undefined}
          loading={loading}
        />
      )}
      <div className="flex items-center gap-2 text-gray-800 cursor-pointer">
        <MdOutlineTranslate size={20} />
        <Select
          size="large"
          defaultValue="en-US"
          onChange={handleLanguageChange}
          className="border-none bg-transparent text-sm"
          options={languageOptions}
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm text-gray-800">{greeting}</span>
        <span className="text-xs text-gray-400">{currentTime}</span>
      </div>
    </div>
  );
}

export default RightSide;
