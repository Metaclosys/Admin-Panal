import { Form, Input, Select, Switch, Card } from 'antd';

const GeneralSettings = () => {
  return (
    <>
      {/* Basic Information Card */}
      <Card title="Basic Information" className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item
            label="Membership Plan Name"
            name="name"
            rules={[{ required: true, message: 'Please enter plan name' }]}
          >
            <Input placeholder="Enter plan name" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            className="md:col-span-2"
          >
            <TextArea rows={4} placeholder="Enter plan description" />
          </Form.Item>
        </div>
      </Card>

      {/* Sharing Options Card */}
      <Card title="Sharing Options" className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item
            label="Allow Sharing"
            name="allowSharing"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => 
              prevValues.allowSharing !== currentValues.allowSharing
            }
          >
            {({ getFieldValue }) => 
              getFieldValue('allowSharing') ? (
                <Form.Item
                  label="Sharing Scope"
                  name="sharingScope"
                  rules={[{ required: true, message: 'Please select sharing scope' }]}
                >
                  <Select placeholder="Select sharing scope">
                    <Option value="brand">Brand</Option>
                    <Option value="location">Location</Option>
                  </Select>
                </Form.Item>
              ) : null
            }
          </Form.Item>
        </div>
      </Card>
    </>
  );
};

export default GeneralSettings; 