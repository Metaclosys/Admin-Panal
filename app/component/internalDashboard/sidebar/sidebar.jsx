"use client";
import { React, useState, useEffect, useMemo } from "react";
import {
  LogoutOutlined,
  SettingOutlined,
  CreditCardOutlined,
  ShopOutlined,
  UserOutlined,
  GiftOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  MoneyCollectOutlined,
  CheckSquareOutlined,
  DotChartOutlined,
  MenuOutlined,
  UsergroupAddOutlined,
  InboxOutlined,
  UserSwitchOutlined,
  UserAddOutlined,
  GlobalOutlined,
  HistoryOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  NotificationOutlined,
  AppstoreOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { Layout, Menu, Button, Divider } from "antd";
import { useRouter, usePathname } from "next/navigation";
import ThreeDot from "./threeDot/threeDot";
import { useSession } from "next-auth/react";
import { API_ENDPOINTS, apiCall } from "../../../api/apiContent/apiContent";
import { signOut } from "next-auth/react";

const { Sider } = Layout;
function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  // Fetch profile when session token changes
  useEffect(() => {
    const getProfile = async () => {
      if (session?.accessToken) {
        try {
          setLoading(true);
          const data = await apiCall(API_ENDPOINTS.AUTH.PROFILE, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
          });
          setProfile(data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getProfile();
  }, [session?.accessToken]);

  const roles = useMemo(() => {
    if (Array.isArray(session?.user?.roles)) {
      return session.user.roles
        .filter(Boolean)
        .map((role) => (typeof role === "string" ? role.toLowerCase() : role));
    }
    if (session?.user?.role) {
      return [session.user.role.toLowerCase()];
    }
    if (Array.isArray(profile?.roles)) {
      return profile.roles
        .filter(Boolean)
        .map((role) => (typeof role === "string" ? role.toLowerCase() : role));
    }
    if (profile?.roles) {
      return [profile.roles.toString().toLowerCase()];
    }
    return [];
  }, [session?.user?.roles, session?.user?.role, profile?.roles]);

  const isReservationist = roles.includes("reservationist");

  const baseItems = useMemo(() => [
    {
      key: "pages",
      type: "group",
      children: [
        {
          key: "/internalDashboard/services",
          icon: <MenuOutlined style={{ fontSize: "18px" }} />,
          label: "Services",
        },
        {
          key: "/internalDashboard/membership-plans",
          icon: <CreditCardOutlined style={{ fontSize: "18px" }} />,
          label: "Membership Plans",
        },
        {
          key: "/internalDashboard/packages",
          icon: <ShoppingOutlined style={{ fontSize: "18px" }} />,
          label: "Packages",
        },
        {
          key: "/internalDashboard/employees",
          icon: <UsergroupAddOutlined style={{ fontSize: "18px" }} />,
          label: "Employees",
        },
      ],
    },
    {
      key: "analytics",
      type: "group",
      children: [
        {
          icon: <HistoryOutlined style={{ fontSize: "18px" }} />,
          label: "Bookings",
          children: [
            {
              key: "/internalDashboard/Booking/calendar",
              icon: <CalendarOutlined style={{ fontSize: "18px" }} />,
              label: "Calendar",
            },
            {
              key: "/internalDashboard/Booking/findBooking",
              icon: <SearchOutlined style={{ fontSize: "18px" }} />,
              label: "Find Booking",
            },
            {
              key: "/internalDashboard/Booking/manageWaitlist",
              icon: <UnorderedListOutlined style={{ fontSize: "18px" }} />,
              label: "Manage Waitlist",
            },
          ],
        },
        {
          key: "/internalDashboard/customers",
          icon: <GiftOutlined style={{ fontSize: "18px" }} />,
          label: "Customers",
          children: [
            {
              key: "/internalDashboard/Customers/manageCustomers",
              icon: <UserSwitchOutlined style={{ fontSize: "18px" }} />,
              label: "Manage Customers",
            },
          ],
        },
        {
          key: "/internalDashboard/products",
          icon: <NotificationOutlined style={{ fontSize: "18px" }} />,
          label: "Products",
          children: [
            {
              key: "/internalDashboard/Products/manageProducts",
              icon: <SearchOutlined style={{ fontSize: "18px" }} />,
              label: "Manage Products",
            },
            {
              key: "/internalDashboard/Products/managePurchaseOrders",
              icon: <CheckSquareOutlined style={{ fontSize: "18px" }} />,
              label: "Manage Purchase Orders",
            },
            {
              key: "/internalDashboard/Products/manageVendorProductsBrands",
              icon: <DotChartOutlined style={{ fontSize: "18px" }} />,
              label: "Manage Vendor/Products Brands",
            },
          ],
        },
      ],
    },
    {
      key: "giftandorders",
      type: "group",
      children: [
        {
          key: "/internalDashboard/gift-certificates",
          icon: <SettingOutlined style={{ fontSize: "18px" }} />,
          label: "Gift Certificates/Cards",
        },
      ],
    },
  ], []);

  const menuItems = useMemo(() => {
    if (!isReservationist) {
      return baseItems;
    }

    const keysToRemove = new Set([
      "/internalDashboard/employees",
      "/internalDashboard/customers",
      "/internalDashboard/Customers/manageCustomers",
    ]);

    const filterMenuTree = (menuList) =>
      menuList.reduce((acc, item) => {
        if (keysToRemove.has(item.key)) {
          return acc;
        }

        if (item.children) {
          const filteredChildren = filterMenuTree(item.children);

          if (filteredChildren.length === 0) {
            return acc;
          }

          if (filteredChildren.length !== item.children.length) {
            acc.push({ ...item, children: filteredChildren });
            return acc;
          }
        }

        acc.push(item);
        return acc;
      }, []);

    return filterMenuTree(baseItems);
  }, [baseItems, isReservationist]);

  const handleMenuClick = (item) => {
    router.push(item.key);
  };

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <Sider
        collapsible
        trigger={null}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="min-h-screen bg-[var(--bgDark)] shadow-lg"
        width={280}
        theme="light"
      >
        <div className="p-4">
          {/* Logo Section */}
          <div className="flex items-center gap-2 mb-5">
            <Image
              src="/images/pngFiles/noavatar.png"
              alt="logo"
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            {!collapsed && (
              <span className="text-2xl font-bold text-white">LOGO</span>
            )}
          </div>

          {/* User Profile Section */}
          <div className="flex items-center gap-2 mb-5">
            <Image
              src={profile?.avatar || "/images/pngFiles/noavatar.png"}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-lg object-cover"
            />
            {!collapsed && (
              <div className="flex flex-col gap-0 text-white w-full">
                <span className="font-bold">
                  {profile?.username || "Loading..."}
                </span>
                <div className="flex flex-row gap-4 justify-between items-center">
                  <span className="text-sm text-yellow-400">
                    {profile?.roles || "Loading..."}
                  </span>
                  <ThreeDot />
                </div>
              </div>
            )}
          </div>

          <Divider className="my-0" />

          <Menu
            theme="dark"
            mode="inline"
            items={menuItems}
            inlineCollapsed={collapsed}
            onClick={handleMenuClick}
            selectedKeys={[pathname]}
            className="border-r-0 bg-transparent w-full
        [&_.ant-menu-submenu-title]:bg-[#283342]
        [&_.ant-menu-sub]:bg-transparent 
        [&_.ant-menu-item-selected]:bg-[var(--bgSoft)]
        [&_.ant-menu-item:not(.ant-menu-item-selected)]:bg-[#283342]"
          />

          <div className="mt-4">
            <Button
              icon={<LogoutOutlined style={{ fontSize: "18px" }} />}
              className="bg-[#283342] text-white w-full hover:bg-[#525a6b] border-none transition-colors"
              onClick={handleLogout}
            >
              {!collapsed && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </Sider>
      {/* Collapse Button */}
      <Button
        type="primary"
        onClick={() => setCollapsed(!collapsed)}
        className="m-0 p-1 w-max rounded-none"
        style={{
          backgroundColor: "#283342",
          border: "none",
        }}
      >
        {collapsed ? ">" : "<"}
      </Button>
    </>
  );
}

export default Sidebar;


