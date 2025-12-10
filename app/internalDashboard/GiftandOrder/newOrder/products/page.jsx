"use client";
import { useState, useEffect } from "react";
import { Input, Button, message, Spin } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { API_ENDPOINTS, apiCall } from "../../../../api/apiContent/apiContent";

export default function ProductPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      if (!session?.accessToken) return;

      setLoading(true);
      try {
        const data = await apiCall(API_ENDPOINTS.PRODUCTS.BASE, {
          headers: {
            'Authorization': `Bearer ${session.accessToken}`
          }
        });
        setProducts(data);
        // Initialize quantities for all products
        const initialQuantities = data.reduce((acc, product) => {
          acc[product.id] = 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error loading products:", error);
        message.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [session, searchTerm]);

  const handleQuantityChange = (productId, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta),
    }));
  };

  const handleAddToOrder = () => {
    const selectedItems = products
      .filter(product => quantities[product.id] > 0)
      .map(product => ({
        ...product,
        quantity: quantities[product.id]
      }));
    
    setSelectedProducts(selectedItems);
    // TODO: Implement order creation logic
    message.success("Products added to order");
  };

  return (
    <div className="p-6 min-h-screen">
      <p className="text-gray-600">New Order</p>

      <div className="bg-[#E0F2FE] rounded-lg shadow-md p-4 mt-4">
        <h3 className="text-lg font-bold text-black flex items-center">
          <HiOutlineViewGridAdd className="mr-2" /> PRODUCTS
        </h3>

        {/* Search Bar */}
        <div className="mt-2 flex bg-gray-100 rounded-lg overflow-hidden">
          <Input
            placeholder="Scan Or Search"
            className="flex-1 px-4 py-2 border-none bg-transparent focus:ring-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            type="text" 
            icon={<IoSearchOutline />} 
            className="p-2"
            onClick={() => setSearchTerm(searchTerm)}
          />
        </div>

        {/* Product List */}
        <div className="mt-4">
          {loading ? (
            <div className="flex justify-center p-8">
              <Spin size="large" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center p-8 text-gray-500">
              No products found
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 mb-3 bg-white">
                <p className="text-sm font-bold text-blue-600">
                  {product.category}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-md text-black font-semibold">
                      {product.name}
                    </h4>
                    <p className="text-sm text-black">{product.brand}</p>
                    <p className="text-sm text-gray-500">
                      {product.stock} available
                    </p>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center border rounded">
                    <Button
                      type="text"
                      className="px-3 py-1"
                      onClick={() => handleQuantityChange(product.id, -1)}
                    >
                      -
                    </Button>
                    <span className="px-4 text-black">{quantities[product.id] || 1}</span>
                    <Button
                      type="text"
                      className="px-3 py-1"
                      onClick={() => handleQuantityChange(product.id, 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Add to Order Button */}
      <div className="mt-4 flex justify-end">
        <Button
          type="primary"
          className="bg-[#06283D] text-white px-8 py-6 rounded-full"
          onClick={handleAddToOrder}
          disabled={products.length === 0}
        >
          Add to Order
        </Button>
      </div>
    </div>
  );
}
