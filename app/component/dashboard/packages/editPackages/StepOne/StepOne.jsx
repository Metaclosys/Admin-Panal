import { Form, Input, DatePicker, Checkbox, Select } from "antd";

function StepOne() {
  return (
    <>
      {/* First row */}
      <div className="grid grid-cols-2 gap-x-8">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter package name" },
            { type: "string", whitespace: true },
          ]}
        >
          <Input placeholder="Enter Package Name" className="py-2" />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[
            { required: true, message: "Please enter package type" },
            { type: "string", whitespace: true },
          ]}
        >
          <Input placeholder="Enter Package Type" className="py-2" />
        </Form.Item>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-2 gap-x-8">
        <Form.Item
          label="SKU"
          name="sku"
          rules={[
            { required: true, message: "Please enter SKU" },
            { type: "string", whitespace: true },
          ]}
        >
          <Input placeholder="Enter SKU" className="py-2" />
        </Form.Item>

        <Form.Item label="Barcode" name="barcode" rules={[{ type: "string" }]}>
          <Input placeholder="Enter Barcode" className="py-2" />
        </Form.Item>
      </div>

      {/* Third row */}
      <div className="grid grid-cols-2 gap-x-8">
        <Form.Item
          label="Description"
          name="description"
          rules={[{ type: "string" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Write Description"
            className="w-full"
          />
        </Form.Item>

        <div>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please enter price" },
              { type: "number", min: 0 },
            ]}
          >
            <Input
              type="number"
              placeholder="Enter Price"
              className="py-2"
              min={0}
              step={0.01}
            />
          </Form.Item>

          <Form.Item label="" name="thumbnailUrl">
            <div className="flex items-center gap-2">
              <span>Thumbnail:</span>
              <button type="button" className="text-blue-500 underline">
                Upload
              </button>
            </div>
          </Form.Item>

          <Form.Item label="" name="imageUrl">
            <div className="flex items-center gap-2">
              <span>Image:</span>
              <button type="button" className="text-blue-500 underline">
                Upload
              </button>
            </div>
          </Form.Item>
        </div>
      </div>

      {/* Fourth row */}
      <div className="grid grid-cols-2 gap-x-8">
        <Form.Item
          label="Location ID"
          name="locationId"
          rules={[
            { required: true, message: "Please enter location ID" },
            { type: "string", whitespace: true },
          ]}
        >
          <Input placeholder="Enter Location ID" className="py-2" />
        </Form.Item>

        <Form.Item label="Booking Dates" name="bookingDates">
          <DatePicker.RangePicker className="w-full py-2" />
        </Form.Item>
      </div>

      {/* Add Validity Section */}
      <div className="grid grid-cols-2 gap-x-8">
        <div>
          <Form.Item label="Validity Start Date" name="validityStartDate">
            <DatePicker className="w-full py-2" />
          </Form.Item>
          <Form.Item label="Validity End Date" name="validityEndDate">
            <DatePicker className="w-full py-2" />
          </Form.Item>
        </div>
        <Form.Item label="Validity Duration (days)" name="validityDuration">
          <Input type="number" min={0} className="py-2" />
        </Form.Item>
      </div>

      {/* Discount Section */}
      <div className="grid grid-cols-2 gap-x-8">
        <Form.Item
          label="Discount Type"
          name="discountType"
          initialValue="none"
        >
          <Select className="w-full">
            <Select.Option value="none">None</Select.Option>
            <Select.Option value="percentage">Percentage</Select.Option>
            <Select.Option value="amount">Amount</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Discount Amount"
          name="discountAmount"
          initialValue={0}
        >
          <Input type="number" min={0} className="py-2" />
        </Form.Item>
      </div>

      {/* Fifth row */}
      <div className="grid grid-cols-2 gap-x-8">
        <Form.Item
          name="allowOnlineBooking"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox>Allow Online Booking</Checkbox>
        </Form.Item>

        <Form.Item name="isActive" valuePropName="checked" initialValue={true}>
          <Checkbox>Active</Checkbox>
        </Form.Item>
      </div>
    </>
  );
}

export default StepOne;
