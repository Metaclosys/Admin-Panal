"use client";
import { Form, Input, Select, Button } from "antd";
const { TextArea } = Input;

export default function ManageWalkin() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div className="min-h-screen">
      <div className="p-8">
        <p className="text-gray-600 text-sm mb-6">Gents Barber - San Jose</p>

        <div className="bg-white rounded-lg shadow-sm max-w-2xl p-6">
          <h2 className="text-xl text-black font-semibold mb-6">Add Walk-in</h2>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label="Category*"
                name="category"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select placeholder="- Select Category -">
                  <Select.Option value="haircut">Haircut</Select.Option>
                  <Select.Option value="shave">Shave</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Service*"
                name="service"
                rules={[{ required: true, message: "Please select service" }]}
              >
                <Select placeholder="- Select Category first -">
                  <Select.Option value="basic">Basic</Select.Option>
                  <Select.Option value="premium">Premium</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              label="Staff*"
              name="staff"
              rules={[{ required: true, message: "Please select staff" }]}
            >
              <Select placeholder="Anyone">
                <Select.Option value="anyone">Anyone</Select.Option>
                <Select.Option value="john">John</Select.Option>
              </Select>
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label="Name*"
                name="name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input placeholder="Full Name" />
              </Form.Item>

              <Form.Item
                label="Email*"
                name="email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter valid email" },
                ]}
              >
                <Input placeholder="Enter Email" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item label="Gender" name="gender">
                <Select placeholder="Not Specified">
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                  <Select.Option value="other">Other</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Country" name="country">
                <Select placeholder="United States">
                  <Select.Option value="us">United States</Select.Option>
                  <Select.Option value="uk">United Kingdom</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              label="Contact*"
              name="contact"
              rules={[
                { required: true, message: "Please enter contact number" },
              ]}
            >
              <Input placeholder="Phone Number" />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <TextArea rows={4} placeholder="Add description..." />
            </Form.Item>

            <Form.Item className="flex justify-end gap-3 mb-0">
              <div className="flex justify-between gap-3">
                <Button onClick={() => window.history.back()}>Cancel</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-[#06283D]"
                >
                  Add to Waitlist
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
