"use client";
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  TimePicker,
  Checkbox,
  Divider,
} from "antd";
const { TextArea } = Input;

export default function ManageAppointment() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div className="min-h-screen">
      <div className="p-8">
        <p className="text-gray-600 text-sm mb-6">Gents Barber - San Jose</p>

        <div className="bg-white rounded-lg shadow-sm max-w-2xl p-6">
          <h2 className="text-xl text-black font-semibold mb-6">
            Add Appointment Request
          </h2>

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

            <div className="grid grid-cols-3 gap-4">
              <Form.Item
                label="Staff*"
                name="staff"
                rules={[{ required: true, message: "Please select staff" }]}
              >
                <Select placeholder="Anyone">
                  <Select.Option value="anyone">Anyone</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Duration*" className="col-span-2">
                <Input.Group compact>
                  <Form.Item
                    name={["duration", "start"]}
                    noStyle
                    rules={[{ required: true }]}
                  >
                    <Select style={{ width: "45%" }} placeholder="Any">
                      <Select.Option value="any">Any</Select.Option>
                    </Select>
                  </Form.Item>
                  <span
                    style={{
                      width: "10%",
                      textAlign: "center",
                      lineHeight: "32px",
                    }}
                  >
                    To
                  </span>
                  <Form.Item
                    name={["duration", "end"]}
                    noStyle
                    rules={[{ required: true }]}
                  >
                    <Select style={{ width: "45%" }} placeholder="Any">
                      <Select.Option value="any">Any</Select.Option>
                    </Select>
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            </div>

            <Divider>Customer</Divider>

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

            <Form.Item label="Notes" name="notes">
              <TextArea rows={3} />
            </Form.Item>

            <Divider>Customer Available On</Divider>

            <Form.Item label="Dates" required>
              <Input.Group compact>
                <Form.Item
                  name="dates"
                  noStyle
                  rules={[{ required: true, message: "Please select dates" }]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>
              </Input.Group>
            </Form.Item>

            <Form.Item label="Time" required>
              <Input.Group compact>
                <Form.Item
                  name={["time", "start"]}
                  noStyle
                  rules={[{ required: true }]}
                >
                  <TimePicker format="HH:mm" className="w-[45%]" />
                </Form.Item>
                <span
                  style={{
                    width: "10%",
                    textAlign: "center",
                    lineHeight: "32px",
                  }}
                >
                  To
                </span>
                <Form.Item
                  name={["time", "end"]}
                  noStyle
                  rules={[{ required: true }]}
                >
                  <TimePicker format="HH:mm" className="w-[45%]" />
                </Form.Item>
              </Input.Group>
            </Form.Item>

            <Form.Item label="Days" name="days">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button type="link" className="p-0">
                    Select Weekdays
                  </Button>
                  <span>|</span>
                  <Button type="link" className="p-0">
                    Select Weekends
                  </Button>
                </div>
                <Checkbox.Group className="grid grid-cols-7 gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <Checkbox key={day} value={day}>
                        {day}
                      </Checkbox>
                    )
                  )}
                </Checkbox.Group>
              </div>
            </Form.Item>

            <Form.Item className="flex justify-end gap-3 mb-0">
              <div className="flex justify-between gap-3">
                <Button onClick={() => window.history.back()}>Close</Button>
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
