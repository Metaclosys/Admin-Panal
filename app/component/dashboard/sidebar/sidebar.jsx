"use client";
import { React, useState, useEffect, useMemo } from "react";
import {
  LogoutOutlined,
  DashboardOutlined,
  SettingOutlined,
  ShopOutlined,
  UserOutlined,
  MenuOutlined,
  UsergroupAddOutlined,
  TransactionOutlined,
  DesktopOutlined,
  GiftOutlined,
  NotificationOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { Button, Menu, Layout, Divider } from "antd";
import { useRouter, usePathname } from "next/navigation";
import ThreeDot from "./threeDot/threeDot";
import { apiCall, API_ENDPOINTS } from "../../../lib/apiClient";
import { signOut, useSession } from "next-auth/react";

const { Sider } = Layout;

function Sidebar({ initialProfile = null, accessToken: serverAccessToken = null }) {
  const [collapsed, setCollapsed] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(!initialProfile);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const resolvedAccessToken = useMemo(
    () => session?.accessToken ?? serverAccessToken ?? null,
    [session?.accessToken, serverAccessToken]
  );
  const roles = useMemo(() => {
    if (Array.isArray(profile?.roles)) {
      return profile.roles;
    }
    if (profile?.roles) {
      return [profile.roles];
    }
    if (Array.isArray(session?.user?.roles)) {
      return session.user.roles;
    }
    if (session?.user?.role) {
      return [session.user.role];
    }
    return [];
  }, [profile?.roles, session?.user?.roles, session?.user?.role]);

  const rolesLabel = roles.join(", ");
  const isReservationist = roles.includes("reservationist");


  // Fetch profile when session token changes
  useEffect(() => {
    if (!resolvedAccessToken) {
      setLoading(false);
      return;
    }

    if (profile) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const getProfile = async () => {
      try {
        setLoading(true);
        const data = await apiCall(API_ENDPOINTS.AUTH.PROFILE, {
          accessToken: resolvedAccessToken,
        });
        if (isMounted) {
          setProfile(data);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching profile:", error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getProfile();

    return () => {
      isMounted = false;
    };
  }, [resolvedAccessToken, profile]);

  const items = [
    {
      key: "pages",
      // label: "Pages",
      type: "group",
      children: [
        {
          key: "/dashboard",
          icon: <DashboardOutlined style={{ fontSize: "18px" }} />,
          label: "Dashboard",
        },
        {
          key: "/dashboard/shops",
          icon: <ShopOutlined style={{ fontSize: "18px" }} />,
          label: "Shops",
        },
        {
          key: "/dashboard/users",
          icon: <UserOutlined style={{ fontSize: "18px" }} />,
          label: "Users",
        },
        {
          key: "services",
          label: "Services",
          children: [
            //     {
            //        key: "/dashboard/services/add",
            //        label: "Add Service",
            //    },
            {
              key: "/dashboard/services",
              label: "Service",
              icon: <MenuOutlined style={{ fontSize: "18px" }} />,
            },
            {
              key: "/dashboard/services/categories",
              label: "Add Categories",
              icon: <ProductOutlined style={{ fontSize: "18px" }} />,
            },
            {
              key: "/dashboard/membership-plan",
              label: "Membership Plans",
              icon: <DesktopOutlined style={{ fontSize: "18px" }} />,
            },
            {
              key: "/dashboard/packages",
              label: "Packages",
              icon: <AppstoreOutlined style={{ fontSize: "18px" }} />,
            },
          ],
        },
        {
          key: "/dashboard/employees",
          icon: <UsergroupAddOutlined style={{ fontSize: "18px" }} />,
          label: "Employees",
        },
      ],
    },
    {
      key: "analytics",
      // label: "Analytics",
      type: "group",
      children: [
        // {
        //   key: "/dashboard/billing-center",
        //   icon: <TransactionOutlined style={{ fontSize: "18px" }} />,
        //   label: "Billing Center",
        // },
        {
          key: "/dashboard/gift-certificates",
          icon: <GiftOutlined style={{ fontSize: "18px" }} />,
          label: "Gift Certificates / Cards",
        },
        // {
        //   key: "/dashboard/marketing-center",
        //   icon: <NotificationOutlined style={{ fontSize: "18px" }} />,
        //   label: "Marketing Center",
        // },
      ],
    },
    // {
    //   key: "settings",
    //   // label: "Settings",
    //   type: "group",
    //   children: [
    //     {
    //       key: "/dashboard/reports",
    //       icon: <FileTextOutlined style={{ fontSize: "18px" }} />,
    //       label: "Reports",
    //     },
    //     {
    //       key: "/dashboard/settings",
    //       icon: <SettingOutlined style={{ fontSize: "18px" }} />,
    //       label: "Settings",
    //     },
    //   ],
    // },
  ];

  const menuItems = useMemo(() => {
    if (isReservationist) {
      return [
        {
          key: "pages",
          type: "group",
          children: [
            {
              key: "/dashboard/shops",
              icon: <ShopOutlined style={{ fontSize: "18px" }} />,
              label: "Shops",
            },
          ],
        },
      ];
    }
    return items;
  }, [isReservationist]);

  const selectedKey = useMemo(() => {
    if (pathname?.startsWith("/internalDashboard/shops")) {
      return "/dashboard/shops";
    }
    return pathname;
  }, [pathname]);

  const handleMenuClick = (e) => {
    router.push(e.key);
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
        className="min-h-screen bg-[var(--bgDark)] shadow-xl rounded-tr-xl rounded-br-xl overflow-hidden"
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
          <div className="flex items-center gap-2 mb-5 ml-2">
            <Image
              src={profile?.avatar || "/images/pngFiles/noavatar.png"}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-lg object-cover"
            />
            {!collapsed && (
              <div className="flex flex-col text-white w-full">
                <span className="font-bold">
                  {loading ? "Loading..." : profile?.username || "Guest"}
                </span>
                <div className="flex flex-row gap-4 items-center justify-between w-full">
                  <span className="text-sm text-yellow-400">
                    {loading ? "Loading..." : rolesLabel || "Guest"}
                  </span>
                  <ThreeDot />
                </div>
              </div>
            )}
          </div>

          <Divider className="my-0" />

          {/* Menu */}
          <Menu
            theme="dark"
            mode="inline"
            inlineCollapsed={collapsed}
            defaultSelectedKeys={isReservationist ? ["/dashboard/shops"] : ["/dashboard"]}
            items={menuItems}
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
            className="border-r-0 bg-transparent w-full
        [&_.ant-menu-submenu-title]:bg-[#283342]
        [&_.ant-menu-sub]:bg-transparent 
        [&_.ant-menu-item-selected]:bg-[var(--bgSoft)]
        [&_.ant-menu-item:not(.ant-menu-item-selected)]:bg-[#283342]"
          />

          {/* Logout Button */}
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

