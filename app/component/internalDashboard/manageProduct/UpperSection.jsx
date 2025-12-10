"use client";
import { useState, useEffect } from "react";
import { Form, Input, Select, Button, DatePicker, Row, Col } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { API_ENDPOINTS, apiCall } from "../../../api/apiContent/apiContent";
import { message } from "antd";

function UpperSection({ onSearch }) {
  const { data: session } = useSession();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      if (!session?.accessToken) return;
      
      setLoading(true);
      try {
        const [categoriesData, brandsData, vendorsData] = await Promise.all([
          apiCall(API_ENDPOINTS.PRODUCTS.CATEGORIES, {
            headers: { Authorization: `Bearer ${session.accessToken}` }
          }),
          apiCall(API_ENDPOINTS.PRODUCTS.BRANDS, {
            headers: { Authorization: `Bearer ${session.accessToken}` }
          }),
          apiCall(API_ENDPOINTS.PRODUCTS.LOW_STOCK, {
            headers: { Authorization: `Bearer ${session.accessToken}` }
          })
        ]);

        setCategories(categoriesData);
        setBrands(brandsData);
        setVendors(vendorsData);
      } catch (error) {
        console.error("Error loading initial data:", error);
        message.error("Failed to load some data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [session?.accessToken]);

  useEffect(() => {
    const loadSubcategories = async () => {
      if (selectedCategory && session?.accessToken) {
        try {
          const data = await apiCall(API_ENDPOINTS.PRODUCTS.SUBCATEGORIES(selectedCategory), {
            headers: { Authorization: `Bearer ${session.accessToken}` }
          });
          setSubcategories(data);
        } catch (error) {
          console.error("Error loading subcategories:", error);
        }
      }
    };

    loadSubcategories();
  }, [selectedCategory, session]);

  const handleSearch = (values) => {
    onSearch(values);
  };

  const handleReset = () => {
    form.resetFields();
    onSearch({});
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <Link href="/internalDashboard/Products/manageProducts/addProducts">
          <Button type="primary" className="bg-[#06283D]">
            + Add New Product
          </Button>
        </Link>
      </div>

      <Form
        form={form}
        onFinish={handleSearch}
        layout="vertical"
        className="bg-[#47B5FF24] p-4 rounded-md"
      >
        <div className="grid grid-cols-4 gap-4">
          <Form.Item name="productName" label="Product Name">
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item name="category" label="Category">
            <Select
              placeholder="Select category"
              onChange={setSelectedCategory}
              options={categories.map(cat => ({ label: cat, value: cat }))}
              allowClear
            />
          </Form.Item>

          <Form.Item name="subcategory" label="Subcategory">
            <Select
              placeholder="Select subcategory"
              options={subcategories.map(sub => ({ label: sub, value: sub }))}
              disabled={!selectedCategory}
              allowClear
            />
          </Form.Item>

          <Form.Item name="brand" label="Product Brand">
            <Select
              placeholder="Select brand"
              options={brands.map(brand => ({ label: brand, value: brand }))}
              allowClear
            />
          </Form.Item>

          <Form.Item name="vendor" label="Vendor">
            <Select
              placeholder="Select vendor"
              loading={loading}
              allowClear
            >
              {vendors.map((vendor) => (
                <Select.Option key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="filterBy" label="Filter By">
            <Select
              placeholder="Select filter"
              options={[
                { label: "All", value: "all" },
                { label: "In Stock", value: "inStock" },
                { label: "Out of Stock", value: "outOfStock" },
                { label: "Low Stock", value: "lowStock" },
              ]}
              allowClear
            />
          </Form.Item>

          <Form.Item name="dateAdded" label="Date Added">
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item name="lastUpdated" label="Last Updated">
            <DatePicker className="w-full" />
          </Form.Item>
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={handleReset}>Reset</Button>
          <Button type="primary" htmlType="submit" className="bg-[#06283D]">
            Search
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UpperSection;
