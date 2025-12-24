"use client";
import { useEffect, useMemo, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Select, Switch, message } from "antd";
import { useSession } from "next-auth/react";
import { API_ENDPOINTS, apiCall } from "../../../../api/apiContent/apiContent";

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
        item.user?.id ||
        item.user?._id ||
        null
      );
    })
    .filter(Boolean);
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
    entity.user?.id ||
    entity.user?._id ||
    undefined
  );
};

const getEmployeeLabel = (employee) => {
  if (!employee) {
    return "";
  }

  if (typeof employee === "string") {
    return employee;
  }

  const { name, fullName, firstName, lastName, email, user, username } = employee;

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

const USE_ASSIGNMENTS =
  process.env.NEXT_PUBLIC_USE_SERVICE_ASSIGNMENTS === "true";

const buildUpdatePayload = (values, existingService) => ({
  name: values.name ?? existingService?.name ?? "",
  category: values.category ?? existingService?.category ?? "",
  duration: String(normalizeDuration(values.duration ?? existingService?.duration ?? 30)),
  price: formatNumber(values.price ?? existingService?.price ?? 0),
  discount: formatNumber(values.discount ?? existingService?.discount ?? 0),
  productsUsed: Array.isArray(values.products) ? values.products : extractIds(existingService?.productsUsed),
  assignedEmployees: Array.isArray(values.employees) ? values.employees : extractIds(existingService?.assignedEmployees),
  isActive:
    values.isActive !== undefined
      ? Boolean(values.isActive)
      : existingService?.isActive !== undefined
      ? Boolean(existingService.isActive)
      : true,
});

const buildAssignmentUpdatePayload = (values, existingService, shopId) => {
  const assignmentId =
    existingService?.assignmentId || existingService?.assignmentMeta?.assignmentId;
  if (!assignmentId) {
    throw new Error("Missing assignment identifier");
  }

  const resolvedLocationId =
    existingService?.assignmentMeta?.locationId || shopId || existingService?.locationId;

  return {
    id: assignmentId,
    payload: {
      locationId: resolvedLocationId ? String(resolvedLocationId) : undefined,
      price: formatNumber(values.price ?? existingService?.price ?? 0),
      duration: String(normalizeDuration(values.duration ?? existingService?.duration ?? 30)),
      discount: formatNumber(values.discount ?? existingService?.discount ?? 0),
      employees: Array.isArray(values.employees)
        ? values.employees
        : extractIds(existingService?.assignedEmployees),
      products: Array.isArray(values.products)
        ? values.products
        : extractIds(existingService?.productsUsed || existingService?.products || []),
      isActive:
        values.isActive !== undefined
          ? Boolean(values.isActive)
          : existingService?.isActive !== undefined
          ? Boolean(existingService.isActive)
          : true,
    },
  };
};

function EditServiceModal({ open, onClose, onSuccess, service, shopId }) {
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingOptions, setFetchingOptions] = useState(false);
  const [currentService, setCurrentService] = useState(service || null);

  const serviceId = useMemo(() => {
    if (!service) {
      return undefined;
    }
    return service.assignmentId || service._id || service.id || service.serviceId;
  }, [service]);

  useEffect(() => {
    if (!open) {
      form.resetFields();
      setCurrentService(service || null);
      return;
    }

    if (service) {
      setCurrentService(service);
    }
  }, [open, service, form]);

  useEffect(() => {
    if (!open || !session?.accessToken) {
      return;
    }

    const loadSupportingData = async () => {
      try {
        setFetchingOptions(true);
        const headers = {
          Authorization: `Bearer ${session.accessToken}`,
        };
        const effectiveShopId =
          shopId ||
          service?.shopId ||
          service?.shop?._id ||
          service?.shop?.id;
        const employeeEndpoint = effectiveShopId
          ? `${API_ENDPOINTS.EMPLOYEES.BASE}?locationId=${encodeURIComponent(effectiveShopId)}`
          : API_ENDPOINTS.EMPLOYEES.BASE;
        const [employeesData, productsData] = await Promise.all([
          apiCall(employeeEndpoint, { headers }),
          apiCall(API_ENDPOINTS.PRODUCTS.BASE, { headers }),
        ]);
        setEmployees(Array.isArray(employeesData) ? employeesData : []);
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (error) {
        console.error("Failed to load employees/products", error);
        message.error(error.message || "Failed to load employees or products");
        setEmployees([]);
        setProducts([]);
      } finally {
        setFetchingOptions(false);
      }
    };

    loadSupportingData();
  }, [open, session?.accessToken, shopId, service]);

  useEffect(() => {
    if (!open || !currentService) {
      return;
    }

    form.setFieldsValue({
      name: currentService.name,
      category: currentService.category,
      duration: normalizeDuration(currentService.duration, 30),
      price: formatNumber(currentService.price, 0),
      discount: formatNumber(currentService.discount, 0),
      employees: extractIds(currentService.assignedEmployees),
      products: extractIds(currentService.productsUsed || []),
      isActive:
        currentService.isActive !== undefined ? Boolean(currentService.isActive) : true,
    });
  }, [currentService, open, form]);

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

  const modalDisabled = loading || fetchingOptions;

  const handleCancel = () => {
    if (loading) {
      return;
    }
    form.resetFields();
    onClose?.();
  };

  const handleSubmit = async () => {
    if (!serviceId) {
      message.error("Missing service identifier");
      return;
    }

    if (!session?.accessToken) {
      message.error("Missing access token. Please log in again.");
      return;
    }

    try {
      const values = await form.validateFields();
      if (USE_ASSIGNMENTS && service?.assignmentId) {
        const { id, payload } = buildAssignmentUpdatePayload(
          values,
          currentService || service,
          shopId
        );

        await apiCall(API_ENDPOINTS.SERVICE_ASSIGNMENTS.BY_ID(id), {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        const payload = buildUpdatePayload(values, currentService || service);

        await apiCall(API_ENDPOINTS.SERVICES.BY_ID(encodeURIComponent(serviceId)), {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify(payload),
        });
      }

      message.success(
        USE_ASSIGNMENTS && service?.assignmentId
          ? "Service assignment updated successfully"
          : "Service updated successfully"
      );
      onSuccess?.();
    } catch (error) {
      if (error?.errorFields) {
        return;
      }
      console.error("Failed to update service", error);
      message.error(error.message || "Failed to update service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Service"
      open={open}
      width={720}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
      maskClosable={!loading}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} disabled={modalDisabled}>
        <Form.Item
          label="Service Name"
          name="name"
          rules={[{ required: true, message: "Please enter service name" }]}
        >
          <Input placeholder="Enter service name" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please enter category" }]}
        >
          <Input placeholder="Enter category" />
        </Form.Item>

        <Form.Item
          label="Duration (minutes)"
          name="duration"
          rules={[{ required: true, message: "Please enter duration" }]}
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
          <InputNumber min={0} max={100} className="w-full" placeholder="Enter discount" />
        </Form.Item>

        <Form.Item label="Employees" name="employees">
          <Select
            mode="multiple"
            allowClear
            placeholder={fetchingOptions ? "Loading employees..." : "Select employees"}
            loading={fetchingOptions}
            options={employeeOptions}
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item label="Products" name="products">
          <Select
            mode="multiple"
            allowClear
            placeholder={fetchingOptions ? "Loading products..." : "Select products"}
            loading={fetchingOptions}
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
          <Button onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Changes
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default EditServiceModal;
