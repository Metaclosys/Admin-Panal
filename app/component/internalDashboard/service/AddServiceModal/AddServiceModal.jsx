"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  InputNumber,
  Modal,
  Select,
  Switch,
  Typography,
  message,
} from "antd";
import { useSession } from "next-auth/react";
import { API_ENDPOINTS, apiCall } from "../../../../api/apiContent/apiContent";

const { Text } = Typography;

const formatNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeDuration = (value, fallback = 30) => {
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const extractIds = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      if (!item) {
        return null;
      }

      if (typeof item === "string") {
        return item;
      }

      return (
        item._id ||
        item.id ||
        item.employeeId ||
        item.productId ||
        item.userId ||
        (item.user && (item.user._id || item.user.id)) ||
        null
      );
    })
    .filter(Boolean);
};

const buildServicePayload = (baseService, overrides, shopId) => {
  if (!baseService) {
    throw new Error("Base service is required");
  }

  const {
    _id,
    id,
    serviceId,
    name,
    serviceType,
    category,
    subcategory,
    subCategory,
    productBrand,
    sku,
    barcode,
    duration,
    description,
    isAddOn,
    requiresTwoStaffMembers,
    requiresProcessingTime,
    showInOnlineMenu,
    thumbnailUrl,
    imageUrl,
    depositPrePayment,
    staffFee,
    requiresEquipment,
    doNotRequireStaffOnAvailabilitySearch,
    productCostPerService,
    assignedEmployees,
    assignedRooms,
    isActive,
    shopCategoryRequirements,
    productsUsed,
    products,
  } = baseService;

  const resolvedEmployees =
    overrides.employees !== undefined
      ? overrides.employees
      : extractIds(assignedEmployees);

  const resolvedProducts =
    overrides.products !== undefined
      ? overrides.products
      : extractIds(productsUsed || products || []);

  const rawServiceId = serviceId ?? id ?? _id;
  const normalizedServiceId =
    typeof rawServiceId === "string"
      ? rawServiceId
      : rawServiceId?._id || rawServiceId?.id
      ? String(rawServiceId._id || rawServiceId.id)
      : rawServiceId != null
      ? String(rawServiceId)
      : undefined;

  return {
    serviceId: normalizedServiceId,
    name: name ?? "Untitled Service",
    serviceType: serviceType ?? "standard",
    category: category ?? "",
    shopCategoryRequirements: Array.isArray(shopCategoryRequirements)
      ? shopCategoryRequirements
      : [],
    subcategory: subcategory ?? subCategory ?? "",
    productBrand: productBrand ?? "",
    sku:
      sku ||
      (name
        ? name
            .toString()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
        : `service-${Date.now()}`),
    barcode: barcode ?? "",
    duration: String(normalizeDuration(overrides.duration ?? duration ?? 30)),
    description: description ?? "",
    isAddOn: Boolean(isAddOn),
    requiresTwoStaffMembers: Boolean(requiresTwoStaffMembers),
    requiresProcessingTime: Boolean(requiresProcessingTime),
    showInOnlineMenu:
      showInOnlineMenu !== undefined ? Boolean(showInOnlineMenu) : true,
    thumbnailUrl: thumbnailUrl ?? "",
    imageUrl: imageUrl ?? "",
    depositPrePayment: depositPrePayment ?? { type: "none", value: 0 },
    staffFee: staffFee ?? { type: "none", value: 0 },
    requiresEquipment: Boolean(requiresEquipment),
    doNotRequireStaffOnAvailabilitySearch: Boolean(
      doNotRequireStaffOnAvailabilitySearch
    ),
    price: formatNumber(overrides.price, formatNumber(baseService.price, 0)),
    productCostPerService: formatNumber(productCostPerService, 0),
    assignedEmployees: resolvedEmployees,
    assignedRooms: Array.isArray(assignedRooms) ? extractIds(assignedRooms) : [],
    productsUsed: resolvedProducts,
    locationId: shopId,
    isActive: overrides.isActive ?? isActive ?? true,
    discount: formatNumber(overrides.discount, formatNumber(baseService.discount, 0)),
  };
};

const getEntityId = (entity) => {
  if (!entity) {
    return undefined;
  }
  if (typeof entity === "string") {
    return entity;
  }
  return (
    entity._id ||
    entity.id ||
    entity.employeeId ||
    entity.productId ||
    (entity.user && (entity.user._id || entity.user.id))
  );
};

const getEmployeeLabel = (employee) => {
  if (!employee) {
    return "";
  }

  if (typeof employee === "string") {
    return employee;
  }

  const {
    name,
    fullName,
    firstName,
    lastName,
    email,
    user,
    username,
  } = employee;

  if (typeof name === "string" && name.trim()) {
    return name.trim();
  }

  if (typeof fullName === "string" && fullName.trim()) {
    return fullName.trim();
  }

  const combined = [firstName, lastName]
    .filter((part) => typeof part === "string" && part.trim())
    .join(" ");
  if (combined) {
    return combined;
  }

  if (user?.name) {
    return user.name;
  }

  if (email) {
    return email;
  }

  if (user?.email) {
    return user.email;
  }

  if (username) {
    return username;
  }

  return getEntityId(employee) || "Unknown";
};

const getProductLabel = (product) => {
  if (!product) {
    return "";
  }

  if (typeof product === "string") {
    return product;
  }

  const { name, productName, title, sku, barcode } = product;

  if (typeof name === "string" && name.trim()) {
    return name.trim();
  }

  if (typeof productName === "string" && productName.trim()) {
    return productName.trim();
  }

  if (typeof title === "string" && title.trim()) {
    return title.trim();
  }

  if (sku) {
    return sku;
  }

  if (barcode) {
    return barcode;
  }

  return getEntityId(product) || "Unknown";
};

function AddServiceModal({ open, onClose, onSuccess, shopId }) {
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const [availableServices, setAvailableServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);
  const [fetchingServices, setFetchingServices] = useState(false);
  const [fetchingEmployees, setFetchingEmployees] = useState(false);
  const [fetchingProducts, setFetchingProducts] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const selectedService = useMemo(() => {
    if (!selectedServiceId) {
      return null;
    }
    return availableServices.find((service) => {
      const identifier = service._id || service.id;
      return identifier === selectedServiceId;
    });
  }, [availableServices, selectedServiceId]);

  useEffect(() => {
    if (!open) {
      form.resetFields();
      setSelectedServiceId(null);
      return;
    }

    if (!session?.accessToken) {
      message.error("Missing access token. Please log in again.");
      return;
    }

    const loadSupportingData = async () => {
      const headers = {
        Authorization: `Bearer ${session.accessToken}`,
      };

      setFetchingServices(true);
      setFetchingEmployees(true);
      setFetchingProducts(true);

      try {
        const employeeEndpoint = shopId
          ? `${API_ENDPOINTS.EMPLOYEES.BASE}?locationId=${encodeURIComponent(shopId)}`
          : API_ENDPOINTS.EMPLOYEES.BASE;

        const [servicesData, employeesData, productsData] = await Promise.all([
          apiCall(API_ENDPOINTS.SERVICES.BASE, { headers }),
          apiCall(employeeEndpoint, { headers }),
          apiCall(API_ENDPOINTS.PRODUCTS.BASE, { headers }),
        ]);

        setAvailableServices(Array.isArray(servicesData) ? servicesData : []);
        setEmployees(Array.isArray(employeesData) ? employeesData : []);
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (error) {
        console.error("Failed to load supporting data", error);
        message.error(error.message || "Failed to load services, employees, or products");
        setAvailableServices([]);
        setEmployees([]);
        setProducts([]);
      } finally {
        setFetchingServices(false);
        setFetchingEmployees(false);
        setFetchingProducts(false);
      }
    };

    loadSupportingData();
  }, [open, session?.accessToken, shopId, form]);

  useEffect(() => {
    if (!open) {
      return;
    }

    if (!selectedService) {
      form.setFieldsValue({
        price: undefined,
        duration: undefined,
        discount: 0,
        isActive: true,
        employees: [],
        products: [],
      });
      return;
    }

    form.setFieldsValue({
      price: formatNumber(selectedService.price, 0),
      duration: normalizeDuration(selectedService.duration, 30),
      discount: formatNumber(selectedService.discount, 0),
      isActive:
        selectedService.isActive !== undefined
          ? Boolean(selectedService.isActive)
          : true,
      employees: extractIds(selectedService.assignedEmployees),
      products: extractIds(selectedService.productsUsed || selectedService.products || []),
    });
  }, [selectedService, open, form]);

  const handleCancel = () => {
    if (submitting) {
      return;
    }
    form.resetFields();
    setSelectedServiceId(null);
    onClose?.();
  };

  const handleSubmit = async () => {
    if (!shopId) {
      message.error("Please select a shop first.");
      return;
    }

    try {
      const values = await form.validateFields();
      if (!selectedService) {
        message.error("Please choose a service to add.");
        return;
      }

      if (!session?.accessToken) {
        message.error("Missing access token. Please log in again.");
        return;
      }

      const payload = buildServicePayload(selectedService, values, shopId);

      setSubmitting(true);
      await apiCall(API_ENDPOINTS.SERVICES.BASE, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      message.success("Service added to shop successfully");
      form.resetFields();
      setSelectedServiceId(null);
      onSuccess?.();
      onClose?.();
    } catch (error) {
      if (error?.errorFields) {
        return;
      }
      console.error("Failed to add service", error);
      message.error(error.message || "Failed to add service");
    } finally {
      setSubmitting(false);
    }
  };

  const employeeOptions = useMemo(
    () =>
      employees
        .map((employee) => ({
          value: getEntityId(employee),
          label: getEmployeeLabel(employee),
        }))
        .filter((option) => option.value),
    [employees]
  );

  const productOptions = useMemo(
    () =>
      products
        .map((product) => ({
          value: getEntityId(product),
          label: getProductLabel(product),
        }))
        .filter((option) => option.value),
    [products]
  );

  const modalDisabled =
    submitting || fetchingServices || fetchingEmployees || fetchingProducts;

  return (
    <Modal
      title="Add Service"
      open={open}
      width={720}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
      maskClosable={!submitting}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={modalDisabled}
      >
        <Form.Item
          label="Service"
          name="serviceId"
          rules={[{ required: true, message: "Please select a service" }]}
        >
          <Select
            showSearch
            placeholder={fetchingServices ? "Loading services..." : "Select a service"}
            loading={fetchingServices}
            optionFilterProp="label"
            onChange={(value) => {
              setSelectedServiceId(value);
              form.setFieldsValue({ serviceId: value });
            }}
            value={selectedServiceId}
            options={availableServices.map((service) => ({
              value: service._id || service.id,
              label: service.name || "Untitled Service",
            }))}
          />
        </Form.Item>

        {selectedService && (
          <div className="mb-4 rounded border border-dashed border-gray-200 bg-gray-50 p-3">
            <Text strong>{selectedService.name}</Text>
            <div className="mt-1 text-sm text-gray-600">
              <div>Category: {selectedService.category || "-"}</div>
              <div>
                Subcategory: {selectedService.subcategory || selectedService.subCategory || "-"}
              </div>
            </div>
          </div>
        )}

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
                  : Promise.reject(new Error("Duration must be greater than 0"));
              },
            },
          ]}
        >
          <InputNumber min={1} className="w-full" placeholder="Enter duration" />
        </Form.Item>

        <Form.Item
          label="Price ($)"
          name="price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber
            min={0}
            step={0.01}
            className="w-full"
            placeholder="Enter price"
            formatter={(value) => (value !== undefined ? `$ ${value}` : "$ 0")}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>

        <Form.Item label="Discount (%)" name="discount">
          <InputNumber
            min={0}
            max={100}
            className="w-full"
            placeholder="Enter discount"
          />
        </Form.Item>

        <Form.Item label="Employees" name="employees">
          <Select
            mode="multiple"
            allowClear
            placeholder={fetchingEmployees ? "Loading employees..." : "Select employees"}
            loading={fetchingEmployees}
            options={employeeOptions}
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item label="Products" name="products">
          <Select
            mode="multiple"
            allowClear
            placeholder={fetchingProducts ? "Loading products..." : "Select products"}
            loading={fetchingProducts}
            options={productOptions}
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item
          label="Active"
          name="isActive"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch />
        </Form.Item>

        <div className="mt-6 flex justify-end gap-3">
          <Button onClick={handleCancel} disabled={submitting}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Add Service
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddServiceModal;
