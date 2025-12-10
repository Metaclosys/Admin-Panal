"use client";
import { useState, useEffect } from "react";
import { Button, message, Select } from "antd";
import { useSession } from "next-auth/react";
import DeletePop from "../../dashboard/deletePop/deletePop";
import UniversalTable from "../../dashboard/table/universalTable";
import { API_ENDPOINTS, apiCall } from "../../../api/apiContent/apiContent";

function MiddleSection({ searchParams, refreshTrigger, onProductUpdated }) {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeletePop, setShowDeletePop] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      if (!session?.accessToken) return;

      setLoading(true);
      try {
        const hasFilters =
          searchParams && Object.keys(searchParams).length > 0;
        const query = hasFilters
          ? `?${new URLSearchParams(searchParams).toString()}`
          : "";
        const endpoint = `${API_ENDPOINTS.PRODUCTS.BASE}${query}`;
        const data = await apiCall(endpoint, {
          accessToken: session.accessToken,
        });
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading products:", error);
        message.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchParams, refreshTrigger, session]);

  const handleDelete = async (productId) => {
    try {
      await apiCall(API_ENDPOINTS.PRODUCTS.BY_ID(productId), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        }
      });
      message.success("Product deleted successfully");
      onProductUpdated();
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Failed to delete product");
    }
    setShowDeletePop(false);
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedRows.map((id) => apiCall(API_ENDPOINTS.PRODUCTS.BY_ID(id), {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session?.accessToken}`
          }
        }))
      );
      message.success("Selected products deleted successfully");
      onProductUpdated();
      setSelectedRows([]);
    } catch (error) {
      console.error("Error deleting products:", error);
      message.error("Failed to delete selected products");
    }
  };

  const columns = [
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Size/Vol",
      key: "sizeVol",
    },
    {
      title: "Color",
      key: "color",
    },
    {
      title: "SKU",
      key: "sku",
    },
    {
      title: "Category",
      key: "category",
    },
    {
      title: "Subcategory",
      key: "subcategory",
    },
    {
      title: "Product Brand",
      key: "brand",
    },
    {
      title: "Stock",
      key: "stock",
    },
    {
      title: "Sell Price",
      key: "sellPrice",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Online 3rd Party",
      key: "online3rdParty",
      render: (value) => (value ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="link"
            onClick={() => {
              // Implement edit functionality
            }}
          >
            Edit
          </Button>
          <span>|</span>
          <Button
            type="link"
            onClick={() => {
              setSelectedProduct(record);
              setShowDeletePop(true);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: (selectedRowKeys) => {
      setSelectedRows(selectedRowKeys);
    },
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <Select defaultValue="flatSortable" style={{ width: 150 }}>
          <Select.Option value="flatSortable">Flat Sortable</Select.Option>
        </Select>

        <div className="flex gap-2">
          <Button type="primary" className="bg-[#47B5FF]" disabled={selectedRows.length === 0}>
            Edit Selected
          </Button>
          <Button
            type="primary"
            className="bg-[#47B5FF]"
            onClick={handleBulkDelete}
            disabled={selectedRows.length === 0}
          >
            Delete Selected
          </Button>
          <Button type="primary" className="bg-[#47B5FF]" disabled={selectedRows.length === 0}>
            Order Selected
          </Button>
          <Button type="primary" className="bg-[#47B5FF]" disabled={selectedRows.length === 0}>
            Adjust Inventory
          </Button>
          <Button type="primary" className="bg-[#47B5FF]">
            Print Inventory Labels
          </Button>
        </div>
      </div>

      <UniversalTable
        rowSelection={rowSelection}
        columns={columns}
        data={products}
        loading={loading}
        rowClassName={(record) => record.id === selectedProduct?.id ? "bg-blue-50" : ""}
      />

      {showDeletePop && (
        <DeletePop
          title="Delete Product"
          message="Are you sure you want to delete this product? This action cannot be undone."
          onCancel={() => {
            setShowDeletePop(false);
            setSelectedProduct(null);
          }}
          onDelete={() => handleDelete(selectedProduct.id)}
          onClose={() => setShowDeletePop(false)}
        />
      )}
    </div>
  );
}

export default MiddleSection;
