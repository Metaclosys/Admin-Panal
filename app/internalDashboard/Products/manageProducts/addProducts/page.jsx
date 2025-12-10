"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Switch,
  Tag,
} from "antd";
import {
  API_ENDPOINTS,
  apiCall,
} from "../../../../api/apiContent/apiContent";

const DEFAULT_FORM_VALUES = {
  sellOnline: false,
  professional: false,
  addOn: false,
  alertOnLowStock: false,
  alertOnReorder: false,
  alertOnOutOfStock: false,
  isActive: true,
  isFeatured: false,
  isTaxable: true,
};

export default function AddProductPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const { data: session } = useSession();
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const accessToken = session?.accessToken;
  const isAuthenticated = Boolean(accessToken);

  const fetchOptions = useCallback(async () => {
    if (!accessToken) return;
    setLoadingOptions(true);
    try {
      const [locationsResponse, categoriesResponse, brandsResponse] =
        await Promise.all([
          apiCall(API_ENDPOINTS.LOCATIONS.BASE, { accessToken }),
          apiCall(API_ENDPOINTS.PRODUCTS.CATEGORIES, { accessToken }),
          apiCall(API_ENDPOINTS.PRODUCTS.BRANDS, { accessToken }),
        ]);

      setLocations(Array.isArray(locationsResponse) ? locationsResponse : []);
      setCategories(
        Array.isArray(categoriesResponse) ? categoriesResponse : []
      );
      setBrands(Array.isArray(brandsResponse) ? brandsResponse : []);
    } catch (error) {
      console.error("Failed to load product options", error);
      message.error("Unable to load product options");
    } finally {
      setLoadingOptions(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetchOptions();
    }
  }, [accessToken, fetchOptions]);

  const locationOptions = useMemo(
    () =>
      locations.map((location) => ({
        label: location.name ?? location.displayName ?? "Unnamed Location",
        value: String(location._id ?? location.id ?? location.locationId),
      })),
    [locations]
  );

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        label: category.name ?? category,
        value: category._id ?? category.id ?? category.name ?? category,
      })),
    [categories]
  );

  const brandOptions = useMemo(
    () =>
      brands.map((brand) => ({
        label: brand.name ?? brand,
        value: brand._id ?? brand.id ?? brand.name ?? brand,
      })),
    [brands]
  );

  const handleSubmit = async (values) => {
    if (!accessToken) {
      message.error("You are not authorized to create products.");
      return;
    }

    if (!values.locations?.length) {
      message.error("Please select at least one location.");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        name: values.name?.trim(),
        category: values.category,
        subcategory: values.subcategory || undefined,
        productBrand: values.productBrand,
        description: values.description?.trim() || "",
        ingredients: values.ingredients?.trim() || undefined,
        thumbnailUrl: values.thumbnailUrl?.trim() || undefined,
        imageUrl: values.imageUrl?.trim() || undefined,
        sku: values.sku?.trim(),
        barcode: values.barcode?.trim() || undefined,
        size: values.size?.trim() || undefined,
        color: values.color?.trim() || undefined,
        vendorId: values.vendorId?.trim() || undefined,
        sellOnline: Boolean(values.sellOnline),
        professional: Boolean(values.professional),
        addOn: Boolean(values.addOn),
        buyPrice: Number(values.buyPrice),
        sellPrice: Number(values.sellPrice),
        commission: values.commission || undefined,
        shipping: values.shipping || "Default",
        stock: Number(values.stock),
        reorderAmount: values.reorderAmount
          ? Number(values.reorderAmount)
          : undefined,
        lowStock: values.lowStock ? Number(values.lowStock) : undefined,
        reorderPoint: values.reorderPoint
          ? Number(values.reorderPoint)
          : undefined,
        par: values.par ? Number(values.par) : undefined,
        alertOnLowStock: Boolean(values.alertOnLowStock),
        alertOnReorder: Boolean(values.alertOnReorder),
        alertOnOutOfStock: Boolean(values.alertOnOutOfStock),
        locationId: values.primaryLocation,
        price: values.price ? Number(values.price) : Number(values.sellPrice),
        cost: values.cost ? Number(values.cost) : Number(values.buyPrice),
        stockQuantity: values.stockQuantity
          ? Number(values.stockQuantity)
          : Number(values.stock),
        lowStockThreshold: values.lowStockThreshold
          ? Number(values.lowStockThreshold)
          : undefined,
        weight: values.weight ? Number(values.weight) : undefined,
        dimensions: values.dimensions
          ? values.dimensions
              .split("x")
              .map((part) => Number(part.trim()))
              .filter((num) => Number.isFinite(num))
          : undefined,
        images: values.images?.length
          ? values.images.map((url) => url.trim()).filter(Boolean)
          : undefined,
        tags: values.tags?.map((tag) => tag.trim()).filter(Boolean),
        locationIds: values.locations,
        isActive: Boolean(values.isActive),
        isFeatured: Boolean(values.isFeatured),
        isTaxable: Boolean(values.isTaxable),
      };

      await apiCall(API_ENDPOINTS.PRODUCTS.BASE, {
        method: "POST",
        accessToken,
        body: JSON.stringify(payload),
      });

      message.success("Product created successfully");
      router.push("/internalDashboard/Products/manageProducts");
    } catch (error) {
      console.error("Failed to create product", error);
      message.error(
        error instanceof Error ? error.message : "Unable to create product"
      );
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-8">
        <Card>
          <p>Please sign in to manage products.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Add New Product</h1>
          <p className="text-gray-500">
            Provide all required information to create a product listing.
          </p>
        </div>
        <Button onClick={() => router.back()}>Cancel</Button>
      </div>

      <Card loading={loadingOptions}>
        <Form
          layout="vertical"
          form={form}
          initialValues={DEFAULT_FORM_VALUES}
          onFinish={handleSubmit}
        >
          <Divider orientation="left">Basic Information</Divider>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Product Name"
                name="name"
                rules={[{ required: true, message: "Product name is required" }]}
              >
                <Input placeholder="e.g., Hydrating Shampoo" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Category is required" }]}
              >
                <Select
                  showSearch
                  placeholder="Select category"
                  options={categoryOptions}
                  filterOption={(input, option) =>
                    option?.label?.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Subcategory" name="subcategory">
                <Input placeholder="Optional subcategory" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Brand"
                name="productBrand"
                rules={[{ required: true, message: "Brand is required" }]}
              >
                <Select
                  showSearch
                  placeholder="Select brand"
                  options={brandOptions}
                  filterOption={(input, option) =>
                    option?.label?.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="SKU"
                name="sku"
                rules={[{ required: true, message: "SKU is required" }]}
              >
                <Input placeholder="Unique SKU" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Barcode" name="barcode">
                <Input placeholder="UPC / EAN" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24}>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Description is required" }]}
              >
                <Input.TextArea rows={4} placeholder="Product description" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Ingredients" name="ingredients">
                <Input.TextArea rows={3} placeholder="Comma separated list" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Tags" name="tags">
                <Select
                  mode="tags"
                  placeholder="Add tags"
                  tokenSeparators={[","]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Thumbnail URL" name="thumbnailUrl">
                <Input placeholder="https://..." />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Image URL" name="imageUrl">
                <Input placeholder="https://..." />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Pricing</Divider>
          <Row gutter={16}>
            <Col xs={24} md={6}>
              <Form.Item
                label="Buy Price"
                name="buyPrice"
                rules={[{ required: true, message: "Buy price is required" }]}
              >
                <InputNumber className="w-full" min={0} prefix="$" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="Sell Price"
                name="sellPrice"
                rules={[{ required: true, message: "Sell price is required" }]}
              >
                <InputNumber className="w-full" min={0} prefix="$" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Display Price" name="price">
                <InputNumber className="w-full" min={0} prefix="$" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Cost" name="cost">
                <InputNumber className="w-full" min={0} prefix="$" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={6}>
              <Form.Item label="Commission" name="commission">
                <Input placeholder="e.g., 10% or flat" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Shipping Profile" name="shipping">
                <Input placeholder="Default" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Weight (grams)" name="weight">
                <InputNumber min={0} className="w-full" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Dimensions (LxWxH cm)" name="dimensions">
                <Input placeholder="e.g., 10x5x3" />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Inventory</Divider>
          <Row gutter={16}>
            <Col xs={24} md={6}>
              <Form.Item
                label="Initial Stock"
                name="stock"
                rules={[{ required: true, message: "Stock is required" }]}
              >
                <InputNumber className="w-full" min={0} />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Stock Quantity" name="stockQuantity">
                <InputNumber className="w-full" min={0} />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Reorder Amount" name="reorderAmount">
                <InputNumber className="w-full" min={0} />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Low Stock Level" name="lowStock">
                <InputNumber className="w-full" min={0} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={6}>
              <Form.Item label="Reorder Point" name="reorderPoint">
                <InputNumber className="w-full" min={0} />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="PAR Level" name="par">
                <InputNumber className="w-full" min={0} />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Low Stock Threshold" name="lowStockThreshold">
                <InputNumber className="w-full" min={0} />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Locations & Availability</Divider>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Primary Location"
                name="primaryLocation"
                rules={[{ required: true, message: "Primary location required" }]}
              >
                <Select
                  placeholder="Select primary location"
                  options={locationOptions}
                  showSearch
                  filterOption={(input, option) =>
                    option?.label?.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Available Locations"
                name="locations"
                rules={[
                  {
                    required: true,
                    message: "Select at least one location",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select locations"
                  options={locationOptions}
                  showSearch
                  filterOption={(input, option) =>
                    option?.label?.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Additional Details</Divider>
          <Row gutter={16}>
            <Col xs={24} md={6}>
              <Form.Item label="Size / Volume" name="size">
                <Input placeholder="e.g., 250ml" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Color" name="color">
                <Input placeholder="e.g., Red" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Vendor ID" name="vendorId">
                <Input placeholder="Vendor reference" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Gallery Images" name="images">
                <Select
                  mode="tags"
                  tokenSeparators={[","]}
                  placeholder="Enter image URLs"
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Flags</Divider>
          <Row gutter={16}>
            <Col xs={24} md={6}>
              <Form.Item
                label="Sell Online"
                name="sellOnline"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="Professional"
                name="professional"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Add-on" name="addOn" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="Alert Low Stock"
                name="alertOnLowStock"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={6}>
              <Form.Item
                label="Alert Reorder"
                name="alertOnReorder"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="Alert Out of Stock"
                name="alertOnOutOfStock"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="Active"
                name="isActive"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="Featured"
                name="isFeatured"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={6}>
              <Form.Item
                label="Taxable"
                name="isTaxable"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end gap-2">
            <Button onClick={() => router.back()}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              className="bg-blue-600"
            >
              Create Product
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
