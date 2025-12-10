"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Empty,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Spin,
  Tag,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { apiCall, API_ENDPOINTS } from "../../../api/apiContent/apiContent";

export default function CategoriesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [form] = Form.useForm();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [subcategoryInputs, setSubcategoryInputs] = useState({});
  const [submittingSubcategoryFor, setSubmittingSubcategoryFor] = useState(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState(null);
  const [deletingSubcategoryId, setDeletingSubcategoryId] = useState({ categoryId: null, subcategoryId: null });

  const authHeaders = useMemo(() => {
    if (!session?.accessToken) {
      return {};
    }
    return {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    };
  }, [session?.accessToken]);

  const fetchCategories = async () => {
    if (!session?.accessToken) {
      return;
    }
    try {
      setLoading(true);
      const data = await apiCall(API_ENDPOINTS.SERVICE_CATEGORIES.BASE, authHeaders);
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching service categories:", error);
      message.error(error.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchCategories();
    }
  }, [session?.accessToken]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleCreateCategory = async (values) => {
    try {
      setCreatingCategory(true);
      const payload = {
        name: values.name.trim(),
      };

      if (Array.isArray(values.subcategories) && values.subcategories.length) {
        payload.subcategories = values.subcategories
          .map((sub) => (typeof sub === "string" ? sub.trim() : ""))
          .filter(Boolean);
      }

      await apiCall(API_ENDPOINTS.SERVICE_CATEGORIES.BASE, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      message.success("Category created");
      form.resetFields();
      await fetchCategories();
    } catch (error) {
      console.error("Error creating category:", error);
      message.error(error.message || "Failed to create category");
    } finally {
      setCreatingCategory(false);
    }
  };

  const handleAddSubcategory = async (categoryId) => {
    const rawValue = subcategoryInputs[categoryId]?.trim();
    if (!rawValue) {
      message.warning("Enter a subcategory name first");
      return;
    }

    try {
      setSubmittingSubcategoryFor(categoryId);
      await apiCall(API_ENDPOINTS.SERVICE_CATEGORIES.SUBCATEGORIES(categoryId), {
        method: "POST",
        body: JSON.stringify({ name: rawValue }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      message.success("Subcategory added");
      setSubcategoryInputs((prev) => ({ ...prev, [categoryId]: "" }));
      await fetchCategories();
    } catch (error) {
      console.error("Error adding subcategory:", error);
      message.error(error.message || "Failed to add subcategory");
    } finally {
      setSubmittingSubcategoryFor(null);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      setDeletingCategoryId(categoryId);
      await apiCall(API_ENDPOINTS.SERVICE_CATEGORIES.BY_ID(categoryId), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      message.success("Category deleted");
      await fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      message.error(error.message || "Failed to delete category");
    } finally {
      setDeletingCategoryId(null);
    }
  };

  const handleDeleteSubcategory = async (categoryId, subcategoryId) => {
    try {
      setDeletingSubcategoryId({ categoryId, subcategoryId });
      await apiCall(
        API_ENDPOINTS.SERVICE_CATEGORIES.SUBCATEGORY_BY_ID(categoryId, subcategoryId),
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      message.success("Subcategory deleted");
      await fetchCategories();
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      message.error(error.message || "Failed to delete subcategory");
    } finally {
      setDeletingSubcategoryId({ categoryId: null, subcategoryId: null });
    }
  };

  if (status === "loading") {
    return (
      <div className="m-6 flex h-full items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="m-6 space-y-6">
      <Card
        title={<span className="text-lg font-semibold text-white">Create Service Category</span>}
        className="bg-[#283342] text-white"
        bordered={false}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateCategory}
          requiredMark={false}
        >
          <Form.Item
            label={<span className="text-white">Category Name</span>}
            name="name"
            rules={[
              { required: true, message: "Please enter a category name" },
              { max: 100, message: "Name must be 100 characters or fewer" },
            ]}
          >
            <Input placeholder="e.g. Hair Care" allowClear />
          </Form.Item>
          <Form.Item
            label={<span className="text-white">Subcategories (optional)</span>}
            name="subcategories"
          >
            <Select
              mode="tags"
              placeholder="Type a subcategory and press enter"
              open={false}
              className="w-full"
              tokenSeparators={[","]}
            />
          </Form.Item>
          <div className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              loading={creatingCategory}
              icon={<PlusOutlined />}
            >
              Create Category
            </Button>
          </div>
        </Form>
      </Card>

      <Card
        title={<span className="text-lg font-semibold text-white">Manage Categories</span>}
        className="bg-[#283342] text-white"
        bordered={false}
      >
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <Spin />
          </div>
        ) : categories.length === 0 ? (
          <Empty description={<span className="text-gray-300">No categories yet</span>} />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <Card
                key={category._id}
                className="bg-[#1f2734] text-white"
                bordered={false}
                title={
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-white">{category.name}</h3>
                      <p className="text-xs text-gray-300">
                        {category.subcategories?.length || 0} subcategories
                      </p>
                    </div>
                    <Popconfirm
                      title="Delete category?"
                      description="This will remove the category and all of its subcategories."
                      okText="Delete"
                      okButtonProps={{ danger: true, loading: deletingCategoryId === category._id }}
                      cancelText="Cancel"
                      onConfirm={() => handleDeleteCategory(category._id)}
                    >
                      <Button
                        danger
                        type="text"
                        size="small"
                        icon={<DeleteOutlined />}
                        loading={deletingCategoryId === category._id}
                      />
                    </Popconfirm>
                  </div>
                }
              >
                <div className="min-h-[72px] space-y-2">
                  {category.subcategories?.length ? (
                    category.subcategories.map((sub) => (
                      <div
                        key={sub._id}
                        className="flex items-center justify-between rounded-md bg-[#283342] px-3 py-1"
                      >
                        <Tag color="blue" className="bg-transparent text-white">
                          {sub.name}
                        </Tag>
                        <Popconfirm
                          title="Delete subcategory?"
                          okText="Delete"
                          okButtonProps={{
                            danger: true,
                            loading:
                              deletingSubcategoryId.categoryId === category._id &&
                              deletingSubcategoryId.subcategoryId === sub._id,
                          }}
                          cancelText="Cancel"
                          onConfirm={() => handleDeleteSubcategory(category._id, sub._id)}
                        >
                          <Button
                            type="text"
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                            loading={
                              deletingSubcategoryId.categoryId === category._id &&
                              deletingSubcategoryId.subcategoryId === sub._id
                                    }
                          />
                        </Popconfirm>
                      </div>
                    ))
                  ) : (
                    <div className="flex h-full items-center justify-center rounded-md bg-[#283342] py-4 text-sm text-gray-300">
                      No subcategories yet
                    </div>
                  )}
                </div>
                <div className="mt-4 flex gap-2">
                  <Input
                    value={subcategoryInputs[category._id] || ""}
                    onChange={(event) =>
                      setSubcategoryInputs((prev) => ({
                        ...prev,
                        [category._id]: event.target.value,
                      }))
                    }
                    placeholder="Add subcategory"
                    onPressEnter={() => handleAddSubcategory(category._id)}
                    allowClear
                  />
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    loading={submittingSubcategoryFor === category._id}
                    onClick={() => handleAddSubcategory(category._id)}
                  >
                    Add
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}


