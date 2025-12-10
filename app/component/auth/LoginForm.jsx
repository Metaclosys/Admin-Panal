"use client";

import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import {
  apiCall,
  API_ENDPOINTS,
  setAccessToken,
} from "../../api/apiContent/apiContent";

const { Title, Text } = Typography;

export default function LoginForm({
  className = "",
  showHeading = true,
  heading = "Log in",
  subheading = "Welcome back! Please enter your credentials.",
  submitButtonClassName = "w-full bg-[#214a64] hover:bg-[#214a90] rounded-md",
  submitButtonLabel = "Sign in",
  showSignUpLink = true,
  onSuccess,
}) {
  const router = useRouter();
  const { status } = useSession();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isRedirecting, setIsRedirecting] = React.useState(false);
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const onFinish = async (values) => {
    try {
      setIsRedirecting(true);
      setErrorMessage("");

      const response = await apiCall(API_ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        suppressErrorLog: true,
      });

      const accessToken =
        response?.access_token || response?.token || response?.accessToken;

      if (accessToken) {
        try {
          setAccessToken(accessToken);
        } catch (_) {
          // ignore token persistence issues
        }

        const result = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
          accessToken,
          user: JSON.stringify({
            id: response.user?.id || response.user?._id,
            name: response.user?.username || response.user?.name,
            email: response.user?.email || values.email,
            role: response.user?.role || response.user?.roles?.[0] || "user",
            roles:
              response.user?.roles ||
              (response.user?.role ? [response.user.role] : undefined),
            assignedLocations: response.user?.assignedLocations,
          }),
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        message.success("Login successful!");
        if (onSuccess) {
          onSuccess(result);
        } else {
          router.push("/dashboard");
        }
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      setErrorMessage(
        error.message || "An unexpected error occurred. Please try again."
      );
      form.setFields([
        {
          name: "password",
          errors: ["Invalid credentials"],
        },
      ]);
    } finally {
      setIsRedirecting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {showHeading && (
        <div className="text-center mb-8">
          <Title level={2} className="my-3">
            {heading}
          </Title>
          <Text className="text-gray-500">{subheading}</Text>
        </div>
      )}

      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              type: "email",
              message: "Please enter a valid email address!",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Enter your email"
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Enter your password"
            className="rounded-md"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className={submitButtonClassName}
            loading={isRedirecting}
            disabled={isRedirecting}
          >
            {isRedirecting ? "Signing in..." : submitButtonLabel}
          </Button>
        </Form.Item>
      </Form>

      {showSignUpLink && (
        <div className="text-center mt-4">
          <Link href="/create-acc" className="text-blue-500 underline">
            Don't have an account? Sign up
          </Link>
        </div>
      )}

      {errorMessage && (
        <div className="text-center mt-4 text-red-500">{errorMessage}</div>
      )}
    </div>
  );
}
