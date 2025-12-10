'use client'
import { Card, Progress, Button } from 'antd';

const MiddleSection = () => {
  return (
    <div className="mt-8">
      <Card className="shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16">
            <Progress type="circle" percent={63} size={64} />
          </div>
          <div>
            <h3 className="text-lg font-medium">You've categorized 63% of your sales for January 2025</h3>
            <p className="text-gray-500">Start categorizing your orders to better understand where sales are coming from.</p>
            <Button size="large" shape="round" className="mt-2 text-white bg-blue-600 hover:bg-blue-700">Learn More →</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MiddleSection;