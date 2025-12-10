import { Form, Input, DatePicker, Checkbox, Select } from "antd";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  apiCall,
  API_ENDPOINTS,
} from "../../../../../api/apiContent/apiContent";

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
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function StepOne() {
  const [locations, setLocations] = useState([]);
  const [locationsLoading, setLocationsLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLocationsLoading(true);
        if (!session?.accessToken) {
          throw new Error("No access token available");
        }

        const response = await apiCall(API_ENDPOINTS.LOCATIONS.BASE, {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        });
        console.log("Locations API response:", response);
        // Try to support both response.data and response.shops
        const locationsArr = response.data || response.shops || response || [];
        setLocations(locationsArr);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLocationsLoading(false);
      }
    };

    if (session?.accessToken) {
      fetchLocations();
    }
  }, [session]);

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
            { required: false, message: "Please enter SKU" },
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
          label="Location"
          name="locationId"
          rules={[{ required: true, message: "Please select a location" }]}
        >
          <Select
            placeholder="Select Location"
            loading={locationsLoading}
            style={{ padding: "8px", minHeight: 40 }}
            options={locations.map((location) => ({
              value: location._id,
              label: location.name,
            }))}
            showSearch
            optionFilterProp="label"
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
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
