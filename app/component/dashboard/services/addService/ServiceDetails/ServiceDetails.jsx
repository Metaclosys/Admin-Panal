import {
  Form,
  Select,
  Input,
  Radio,
  Checkbox,
  Upload,
  InputNumber,
  Switch,
  Button,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import {
  apiCall,
  API_ENDPOINTS,
} from "../../../../../api/apiContent/apiContent";
import { useSession } from "next-auth/react";

const DEFAULT_DURATION_MINUTES = 30;

const normalizeDurationValue = (value) => {
  if (value === null || value === undefined) {
    return DEFAULT_DURATION_MINUTES;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) && value > 0
      ? value
      : DEFAULT_DURATION_MINUTES;
  }

  if (typeof value === "string") {
    const parsed = parseInt(value, 10);
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return DEFAULT_DURATION_MINUTES;
};

export const normalizeServiceFormValues = (service = {}) => {
  if (!service || typeof service !== "object") {
    return {};
  }

  return {
    serviceName: service.name ?? "",
    serviceType: service.serviceType ?? "standard",
    category: service.category ?? "",
    subcategory: service.subcategory ?? service.subCategory ?? "",
    sku: service.sku ?? "",
    barcode: service.barcode ?? "",
    duration: normalizeDurationValue(service.duration),
    productBrand: service.productBrand ?? "",
    description: service.description ?? "",
    isAddOn: Boolean(service.isAddOn),
    requiresTwoStaffMembers: Boolean(service.requiresTwoStaffMembers),
    requiresProcessingTime: Boolean(service.requiresProcessingTime),
    showInOnlineMenu:
      service.showInOnlineMenu !== undefined
        ? Boolean(service.showInOnlineMenu)
        : true,
    isActive:
      service.isActive !== undefined ? Boolean(service.isActive) : true,
    depositPrePayment: {
      type: service.depositPrePayment?.type || "none",
      value:
        service.depositPrePayment?.value !== undefined
          ? Number(service.depositPrePayment.value)
          : 0,
    },
    staffFee: {
      type: service.staffFee?.type || "none",
      value:
        service.staffFee?.value !== undefined
          ? Number(service.staffFee.value)
          : 0,
    },
    requiresEquipment: Boolean(service.requiresEquipment),
    doNotRequireStaffOnAvailabilitySearch: Boolean(
      service.doNotRequireStaffOnAvailabilitySearch
    ),
    price:
      service.price !== undefined && service.price !== null
        ? Number(service.price)
        : 0,
    productCostPerService:
      service.productCostPerService !== undefined &&
      service.productCostPerService !== null
        ? Number(service.productCostPerService)
        : 0,
    products: Array.isArray(service.productsUsed) ? service.productsUsed : [],
    employees: Array.isArray(service.assignedEmployees)
      ? service.assignedEmployees
      : [],
    rooms: Array.isArray(service.assignedRooms) ? service.assignedRooms : [],
    imageUrl: service.imageUrl ?? "",
    thumbnailUrl: service.thumbnailUrl ?? "",
  };
};

const ServiceDetails = ({ form, mode = "create", initialValues = null }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.accessToken) {
      return;
    }

    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const data = await apiCall(API_ENDPOINTS.SERVICE_CATEGORIES.BASE, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        const normalized = Array.isArray(data) ? data : [];
        setCategories(normalized);

        const currentCategory = form.getFieldValue("category");
        if (currentCategory) {
          const matched = normalized.find((category) =>
            category?.name?.trim()?.toLowerCase() === String(currentCategory).toLowerCase()
          );

          if (matched) {
            setSelectedCategory(matched.name);
            const subs = Array.isArray(matched.subcategories)
              ? matched.subcategories
                  .map((sub) =>
                    typeof sub?.name === "string" ? sub.name.trim() : ""
                  )
                  .filter(Boolean)
              : [];
            setSubcategoryOptions(subs);

            const existingSubcategory = form.getFieldValue("subcategory");
            if (existingSubcategory) {
              const hasMatch = subs.some(
                (sub) => sub.toLowerCase() === String(existingSubcategory).toLowerCase()
              );
              if (!hasMatch) {
                form.setFieldsValue({ subcategory: undefined });
              }
            }
          } else {
            setSelectedCategory(null);
            setSubcategoryOptions([]);
            form.setFieldsValue({ subcategory: undefined });
          }
        } else {
          setSelectedCategory(null);
          setSubcategoryOptions([]);
          form.setFieldsValue({ subcategory: undefined });
        }

      } catch (error) {
        console.error("Error fetching service categories:", error);
        message.error(error.message || "Failed to load service categories");
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, [session?.accessToken, form]);

  // Ensure default values are set
  useEffect(() => {
    if (mode === "edit") {
      return;
    }

    // Set default values if not already set
    const currentValues = form.getFieldsValue();
    const defaultValues = {
      serviceType: currentValues.serviceType || "standard",
      depositPrePayment: {
        type:
          (currentValues.depositPrePayment &&
            currentValues.depositPrePayment.type) ||
          "none",
      },
      staffFee: {
        type: (currentValues.staffFee && currentValues.staffFee.type) || "none",
      },
      duration:
        currentValues.duration && Number(currentValues.duration) > 0
          ? currentValues.duration
          : DEFAULT_DURATION_MINUTES,
      price: currentValues.price || 0,
      productCostPerService: currentValues.productCostPerService || 0,
    };

    form.setFieldsValue(defaultValues);
  }, [form, mode]);

  useEffect(() => {
    if (!initialValues) {
      return;
    }

    const normalizedValues = normalizeServiceFormValues(initialValues);
    form.setFieldsValue(normalizedValues);

    if (normalizedValues.category) {
      setSelectedCategory(normalizedValues.category);

      if (normalizedValues.subcategory) {
        setSubcategoryOptions((prev) => {
          const nextOptions = Array.isArray(prev) ? prev : [];
          if (nextOptions.includes(normalizedValues.subcategory)) {
            return nextOptions;
          }
          return [...nextOptions, normalizedValues.subcategory];
        });
      }
    } else {
      setSelectedCategory(null);
      setSubcategoryOptions([]);
    }
  }, [initialValues, form]);


  const handleCategoryChange = (nextValue) => {
    const selectedValue = typeof nextValue === "string" && nextValue.trim() ? nextValue.trim() : null;
    setSelectedCategory(selectedValue);

    if (!selectedValue) {
      setSubcategoryOptions([]);
      form.setFieldsValue({ subcategory: undefined });
      return;
    }

    const matchedCategory = categories.find((category) =>
      category?.name?.trim()?.toLowerCase() === selectedValue.toLowerCase(),
    );

    const options = matchedCategory && Array.isArray(matchedCategory.subcategories)
      ? matchedCategory.subcategories
          .map((sub) => (typeof sub?.name === "string" ? sub.name.trim() : ""))
          .filter(Boolean)
      : [];

    setSubcategoryOptions(options);
    form.setFieldsValue({ subcategory: undefined });
  };

  const props = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        setUploadedFiles([...uploadedFiles, info.file]);
        form.setFieldsValue({
          images: [...uploadedFiles, info.file].map(
            (file) => file.response?.url || ""
          ),
        });
      } else if (info.file.status === "error") {
        console.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {mode === "edit" ? "Edit Service" : "Add New Service"}
        </h1>
        <p className="text-gray-600">
          {mode === "edit"
            ? "Update the details below to modify this service."
            : "Fill in the details below to create a new service."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item
          label="Service Name"
          name="serviceName"
          rules={[{ required: true, message: "Please enter service name" }]}
        >
          <Input placeholder="Enter service name" />
        </Form.Item>

        <Form.Item
          label="Service Type"
          name="serviceType"
          rules={[{ required: true, message: "Please select service type" }]}
        >
          <Select placeholder="Select service type">
            <Select.Option value="standard">Standard</Select.Option>
            <Select.Option value="premium">Premium</Select.Option>
            <Select.Option value="express">Express</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select
            placeholder="Select category"
            loading={categoriesLoading}
            onChange={handleCategoryChange}
            onClear={() => handleCategoryChange(undefined)}
            allowClear
            showSearch
            optionFilterProp="children"
          >
            {categories.map((category) => (
              <Select.Option key={category._id || category.name} value={category.name}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Subcategory" name="subcategory">
          <Select
            placeholder={
              selectedCategory
                ? subcategoryOptions.length > 0
                  ? "Select subcategory (optional)"
                  : "No subcategories"
                : "Select a category first"
            }
            disabled={!selectedCategory || categoriesLoading}
            loading={categoriesLoading}
            allowClear
            showSearch
            optionFilterProp="children"
            notFoundContent={
              !categoriesLoading && selectedCategory && subcategoryOptions.length === 0
                ? "No subcategories"
                : undefined
            }
          >
            {subcategoryOptions.map((sub) => (
              <Select.Option key={sub} value={sub}>
                {sub}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="SKU"
          name="sku"
          rules={[
            {
              required: false,
              message:
                "Please enter SKU if not a unique value will be generated",
            },
          ]}
        >
          <Input placeholder="Enter SKU" />
        </Form.Item>

        <Form.Item label="Barcode" name="barcode">
          <Input placeholder="Enter barcode (optional)" />
        </Form.Item>

        <Form.Item
          label="Duration (minutes)"
          name="duration"
          rules={[
            { required: true, message: "Please enter duration" },
            {
              validator: (_, value) => {
                if (value === undefined || value === null) {
                  return Promise.reject(new Error("Duration is required"));
                }
                return Number(value) > 0
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Duration must be greater than 0")
                    );
              },
            },
          ]}
        >
          <InputNumber
            min={1}
            step={1}
            style={{ width: "100%" }}
            placeholder="Enter duration"
          />
        </Form.Item>

        {/* <Form.Item
          label="Price ($)"
          name="price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber
            min={0}
            step={0.01}
            precision={2}
            placeholder="Enter price"
            style={{ width: "100%" }}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item> */}

        <Form.Item label="Product Brand" name="productBrand">
          <Input placeholder="Enter product brand (optional)" />
        </Form.Item>

        {/* <Form.Item
          label="Product Cost Per Service ($)"
          name="productCostPerService"
          initialValue={0}
        >
          <InputNumber
            min={0}
            step={0.01}
            precision={2}
            placeholder="Enter product cost"
            style={{ width: "100%" }}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item> */}

        <Form.Item
          label="Status"
          name="isActive"
          initialValue={true}
          valuePropName="checked"
        >
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>

        <Form.Item
          label="Show in Online Menu"
          name="showInOnlineMenu"
          initialValue={true}
          valuePropName="checked"
        >
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>

        <Form.Item
          label="Is Add-On"
          name="isAddOn"
          initialValue={false}
          valuePropName="checked"
          className="col-span-1"
        >
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>

        <Form.Item
          label="Requires Two Staff Members"
          name="requiresTwoStaffMembers"
          initialValue={false}
          valuePropName="checked"
          className="col-span-1"
        >
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>

        <Form.Item
          label="Requires Equipment"
          name="requiresEquipment"
          initialValue={false}
          valuePropName="checked"
          className="col-span-1"
        >
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>

        <Form.Item
          label="Requires Processing Time"
          name="requiresProcessingTime"
          initialValue={false}
          valuePropName="checked"
          className="col-span-1"
        >
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>

        <Form.Item
          label="Don't Require Staff on Availability Search"
          name="doNotRequireStaffOnAvailabilitySearch"
          initialValue={false}
          valuePropName="checked"
          className="col-span-1 md:col-span-2"
        >
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>

        <Form.Item
          label="Deposit/Pre-Payment Type"
          name={["depositPrePayment", "type"]}
          initialValue="none"
          className="col-span-1"
        >
          <Select>
            <Select.Option value="none">None</Select.Option>
            <Select.Option value="full">Full</Select.Option>
            <Select.Option value="percentage">Percentage</Select.Option>
            <Select.Option value="amount">Fixed Amount</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.depositPrePayment?.type !==
            currentValues.depositPrePayment?.type
          }
        >
          {({ getFieldValue }) => {
            const depositType = getFieldValue(["depositPrePayment", "type"]);
            return depositType === "percentage" || depositType === "amount" ? (
              <Form.Item
                label="Deposit Value"
                name={["depositPrePayment", "value"]}
                rules={[
                  { required: true, message: "Please enter deposit value" },
                ]}
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  formatter={
                    depositType === "percentage"
                      ? (value) => `${value}%`
                      : (value) => `$${value}`
                  }
                  parser={
                    depositType === "percentage"
                      ? (value) => value.replace("%", "")
                      : (value) => value.replace("$", "")
                  }
                />
              </Form.Item>
            ) : null;
          }}
        </Form.Item>

        <Form.Item
          label="Staff Fee Type"
          name={["staffFee", "type"]}
          initialValue="none"
          className="col-span-1"
        >
          <Select>
            <Select.Option value="none">None</Select.Option>
            <Select.Option value="percentage">Percentage</Select.Option>
            <Select.Option value="amount">Fixed Amount</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.staffFee?.type !== currentValues.staffFee?.type
          }
        >
          {({ getFieldValue }) => {
            const feeType = getFieldValue(["staffFee", "type"]);
            return feeType === "percentage" || feeType === "amount" ? (
              <Form.Item
                label="Staff Fee Value"
                name={["staffFee", "value"]}
                rules={[
                  { required: true, message: "Please enter staff fee value" },
                ]}
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  formatter={
                    feeType === "percentage"
                      ? (value) => `${value}%`
                      : (value) => `$${value}`
                  }
                  parser={
                    feeType === "percentage"
                      ? (value) => value.replace("%", "")
                      : (value) => value.replace("$", "")
                  }
                />
              </Form.Item>
            ) : null;
          }}
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          className="col-span-1 md:col-span-2"
        >
          <Input.TextArea rows={4} placeholder="Enter service description" />
        </Form.Item>

        <Form.Item
          label="Service Images"
          name="imageUrl"
          className="col-span-1 md:col-span-2"
        >
          <Upload {...props} listType="picture" multiple={false}>
            <Button icon={<UploadOutlined />}>Upload Main Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Thumbnail"
          name="thumbnailUrl"
          className="col-span-1 md:col-span-2"
        >
          <Upload {...props} listType="picture" multiple={false}>
            <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
          </Upload>
        </Form.Item>
      </div>
    </>
  );
};

export default ServiceDetails;



