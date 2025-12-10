"use client";
import { Button, Radio, Input, Table } from "antd";

function BillingContent() {
  // Credit Card table columns
  const columns = [
    {
      title: "Default",
      dataIndex: "default",
      key: "default",
      width: "15%",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      width: "20%",
    },
    {
      title: "Name On Card",
      dataIndex: "nameOnCard",
      key: "nameOnCard",
      width: "25%",
    },
    {
      title: "Expires",
      dataIndex: "expires",
      key: "expires",
      width: "20%",
    },
    {
      title: "Recurring Membership(s)",
      dataIndex: "recurringMembership",
      key: "recurringMembership",
      width: "20%",
    },
  ];

  // Sample data
  const data = [
    {
      key: "1",
      default: "xxx",
      paymentMethod: "xxx",
      nameOnCard: "xxx",
      expires: "xxx",
      recurringMembership: "xxx",
    },
  ];

  return (
    <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-230px)]">
      {/* Credit Card Section */}
      <div>
        <div className="bg-blue-500 text-white px-4 py-2 font-medium">
          CREDIT CARD
        </div>
        <div className="mt-4">
          {/* Add Card Button */}
          <Button type="link" className="text-blue-500 px-0 mb-4">
            + Add Card
          </Button>

          {/* Credit Cards Table */}
          <Table 
            columns={columns} 
            dataSource={data} 
            pagination={false}
            className="w-full"
          />

          {/* Pre-Authorize Credit Cards Option */}
          <div className="mt-4">
            <div className="text-sm text-gray-600">
              Pre-Authorize Credit Cards when Booking Online:
            </div>
            <div className="mt-2">
              <Radio.Group defaultValue="yes">
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
      </div>

      {/* Tip Preference Section */}
      <div>
        <div className="bg-blue-500 text-white px-4 py-2 font-medium">
          TIP PREFERENCE
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Input 
            style={{ width: '80px' }} 
            defaultValue="0"
          />
          <span>%</span>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button type="primary" className="bg-blue-900">
          Save
        </Button>
      </div>
    </div>
  );
}

export default BillingContent;
