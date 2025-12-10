import { Form, Upload, Input, Select, Button, message, InputNumber, Table, Checkbox, Spin, Empty } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const SelectProducts = ({ form, products = [], loading }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  
  const columns = [
    {
      title: 'Select',
      dataIndex: 'select',
      key: 'select',
      render: (_, record) => (
        <Checkbox 
          checked={selectedProducts.some(p => p.id === record._id || record.id)}
          onChange={(e) => {
            if (e.target.checked) {
              addProduct(record);
            } else {
              removeProduct(record._id || record.id);
            }
          }}
        />
      ),
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: price => `$${parseFloat(price || 0).toFixed(2)}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => {
        const selectedProduct = selectedProducts.find(p => p.id === (record._id || record.id));
        return (
          <InputNumber 
            min={1} 
            value={selectedProduct?.quantity || 1}
            onChange={(value) => handleProductChange(record._id || record.id, 'quantity', value)}
            disabled={!selectedProducts.some(p => p.id === (record._id || record.id))}
            style={{ width: '100%' }}
          />
        );
      },
    },
  ];
  
  const addProduct = (product) => {
    const newProduct = {
      id: product._id || product.id,
      name: product.name,
      quantity: 1,
      cost: parseFloat(product.price || 0)
    };
    setSelectedProducts([...selectedProducts, newProduct]);
    updateFormValues([...selectedProducts, newProduct]);
  };
  
  const removeProduct = (id) => {
    const updatedProducts = selectedProducts.filter(p => p.id !== id);
    setSelectedProducts(updatedProducts);
    updateFormValues(updatedProducts);
  };
  
  const handleProductChange = (id, field, value) => {
    const updatedProducts = selectedProducts.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    );
    setSelectedProducts(updatedProducts);
    updateFormValues(updatedProducts);
  };
  
  const updateFormValues = (products) => {
    // Update form values
    form.setFieldsValue({
      products: products.map(p => p.id)
    });
    
    // Calculate total cost
    const totalCost = products.reduce((sum, p) => sum + (p.cost * p.quantity), 0);
    form.setFieldsValue({
      productCostPerService: totalCost
    });
  };

  useEffect(() => {
    console.log("SelectProducts - form values:", form.getFieldsValue(true));
  }, [form]);

  return (
    <>
      <h1 className="text-[22px] font-medium text-gray-800 mb-8">
        Select Products
      </h1>

      {products.length === 0 ? (
        <div className="text-center py-8">
          <Spin spinning={loading} />
          {products && <Empty description="No products found" />}
        </div>
      ) : (
        <>
          <div className="mb-6">
            <Table 
              dataSource={products} 
              columns={columns} 
              rowKey={record => record._id || record.id}
              pagination={false}
              size="small"
              loading={loading}
            />
          </div>

          <Form.Item
            label="Product Cost Per Service"
            name="productCostPerService"
            initialValue={0}
          >
            <InputNumber
              min={0}
              step={0.01}
              precision={2}
              style={{ width: '100%' }}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              readOnly
            />
          </Form.Item>
          
          {/* Hidden field to store products data */}
          <Form.Item name="products" hidden>
            <Input />
          </Form.Item>
        </>
      )}
    </>
  );
};

export default SelectProducts;
