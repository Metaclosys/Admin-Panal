"use client";
import { Tabs, Image, Button, Card } from "antd";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import Link from "next/link";

const CustomerInfo = () => (
  <div className="flex items-start gap-8 p-4">
    <div className="flex-1">
      <div className="bg-white p-4 rounded-lg">
        <div className="text-sm text-gray-600 mb-2">
          Last Appointment Date Jan 15, 2023 4:16 pm
          <br />
          First Appointment Date Aug 14, 2023 6:30 pm
        </div>

        <div className="flex gap-2 mb-4">
          <Button
            icon={<SearchOutlined />}
            type="primary"
            className="bg-blue-500"
          >
            Find Duplicates
          </Button>
          <Button
            icon={<EditOutlined />}
            type="primary"
            className="bg-blue-500"
          >
            Edit Customer Details
          </Button>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-blue-500">
              Recent Progress Notes
            </h3>
            <Button type="link" className="text-blue-500">
              View All
            </Button>
          </div>
          <Button type="primary" className="bg-blue-500">
            Add Note
          </Button>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-blue-500 mb-4">
            Recent Appointments
          </h3>
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-600">
                <th>Booking #</th>
                <th>Status</th>
                <th>Staff</th>
                <th>Service</th>
                <th>Room</th>
                <th>Appointment on</th>
                <th>Date Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm">
                <td>xxx</td>
                <td>xxx</td>
                <td>xxx</td>
                <td>xxx</td>
                <td>xxx</td>
                <td>xxx</td>
                <td>xxx</td>
                <td>
                  <Button type="link" className="text-blue-500 p-0">
                    View
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-blue-500 mb-4">
            Recent Orders
          </h3>
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-600">
                <th>Order #</th>
                <th>Order Date</th>
                <th>Order Items</th>
                <th>Order Total</th>
                <th>Last Refund Date</th>
                <th>Refund Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm">
                <td>xxx</td>
                <td>xxx</td>
                <td>xxx</td>
                <td>xxx</td>
                <td>xxx</td>
                <td>xxx</td>
                <td>
                  <div className="flex gap-2">
                    <Button type="link" className="text-blue-500 p-0">
                      View
                    </Button>
                    <span>|</span>
                    <Button type="link" className="text-blue-500 p-0">
                      Print Invoice
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-blue-500 mb-4">
            Product Purchases
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p>Gents Grooming Paste</p>
              <p className="text-sm text-gray-500">
                last purchased: Dec 3, 2023 4:27 pm
              </p>
            </div>
            <Button type="primary" className="bg-blue-500">
              Buy Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CustomerInfo;
