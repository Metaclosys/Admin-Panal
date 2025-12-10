"use client";
import { React } from "react";
import { Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

function ThreeDot() {
  const router = useRouter();

  const items = [
    {
      key: "profile",
      label: "My Profile",
      onClick: () => router.push("/dashboard/users/myProfile"),
    },
    {
      key: "logout",
      label: "Logout",
      onClick: () => router.push("/"),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]}>
      <Button type="text" icon={<MoreOutlined />} className="text-white" />
    </Dropdown>
  );
}

export default ThreeDot;

