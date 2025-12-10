'use client'
import { Card } from 'antd';
import { ShoppingCartOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';

const UpperSection = () => {
  return (
    <div className="w-full">
      <div className="text-gray-700 mb-4">
        <h3>A quick data overview of the shops.</h3>
        <div className="flex items-center gap-2 mb-4">
          <span>View Data By</span>
          <div className="flex gap-2">
            <button className="px-4 py-1 bg-blue-500 text-white rounded">Week</button>
            <button className="px-4 py-1 bg-white text-gray-600 rounded">Month</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sales Card */}
        <Card className="shadow-sm">
          <div className="flex flex-col">
            <ShoppingCartOutlined className="text-2xl mb-2" />
            <h4 className="font-medium">Sales</h4>
            <div className="text-xl font-semibold">$8,491</div>
            <div className="text-sm text-gray-500">$5,789 Pending</div>
          </div>
        </Card>

        {/* Customers Card */}
        <Card className="shadow-sm">
          <div className="flex flex-col">
            <UserOutlined className="text-2xl mb-2" />
            <h4 className="font-medium">Customers</h4>
            <div className="text-xl font-semibold">104</div>
            <div className="flex gap-2 text-sm">
              <span className="text-gray-500">100 New</span>
              <span className="text-gray-500">100 Returning</span>
              <span className="text-gray-500">25 VIP</span>
            </div>
          </div>
        </Card>

        {/* Appointments Card */}
        <Card className="shadow-sm">
          <div className="flex flex-col">
            <CalendarOutlined className="text-2xl mb-2" />
            <h4 className="font-medium">Appointments</h4>
            <div className="text-xl font-semibold">103</div>
            <div className="text-sm text-gray-500">4 No-showing</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UpperSection;
