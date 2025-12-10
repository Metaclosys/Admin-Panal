"use client";
import { useState } from "react";
import { Input, Select, Checkbox, Button, Form, message, DatePicker } from "antd";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { API_ENDPOINTS, apiCall } from "../../../../../api/apiContent/apiContent";
import Link from "next/link";

function MiddleSection() {
  const [form] = Form.useForm();
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [sameAsHome, setSameAsHome] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      
      // Format the data to match the DTO structure
      const customerData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        country: values.country,
        gender: values.gender,
        occupation: values.occupation,
        mobilePhone: values.mobilePhone,
        homePhone: values.homePhone,
        workPhone: values.workPhone,
        birthday: values.birthday?.format('YYYY-MM-DD'),
        anniversaryDate: values.anniversaryDate?.format('YYYY-MM-DD'),
        preferredContact: values.preferredContact,
        receiveEmail: values.receiveEmail,
        receiveSMS: values.receiveSMS,
        emailType: {
          transactional: values.transactionalEmail,
          promotional: values.promotionalEmail,
        },
        bookingAlert: values.bookingAlert,
        checkInAlert: values.checkInAlert,
        checkOutAlert: values.checkOutAlert,
        homeAddress: {
          street1: values.homeStreet1,
          street2: values.homeStreet2,
          city: values.homeCity,
          state: values.homeState,
          postalCode: values.homePostalCode,
          country: values.homeCountry,
        },
        billingAddress: sameAsHome ? {
          sameAsHomeAddress: true,
          ...values.homeAddress,
        } : {
          sameAsHomeAddress: false,
          street1: values.billingStreet1,
          street2: values.billingStreet2,
          city: values.billingCity,
          state: values.billingState,
          postalCode: values.billingPostalCode,
          country: values.billingCountry,
        },
        preferredStaffGender: values.preferredStaffGender,
        preferredStaffMember: values.preferredStaffMember,
        referralHistory: values.referralHistory,
        referredBy: values.referredBy,
        emergencyContact: {
          name: values.emergencyName,
          relationship: values.emergencyRelationship,
          phone: values.emergencyPhone,
        },
        login: {
          email: values.email,
          password: values.password,
          loginAlert: values.loginAlert,
        },
      };

      await apiCall(API_ENDPOINTS.CUSTOMERS.BASE, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify(customerData)
      });

      message.success('Customer created successfully');
      form.resetFields();
    } catch (error) {
      console.error('Error creating customer:', error);
      message.error(error.message || 'Failed to create customer');
    } finally {
      setLoading(false);
    }
  };

  const handleSameAsHomeChange = (checked) => {
    setSameAsHome(checked);
    if (checked) {
      const homeAddress = {
        billingStreet1: form.getFieldValue('homeStreet1'),
        billingStreet2: form.getFieldValue('homeStreet2'),
        billingCity: form.getFieldValue('homeCity'),
        billingState: form.getFieldValue('homeState'),
        billingPostalCode: form.getFieldValue('homePostalCode'),
        billingCountry: form.getFieldValue('homeCountry'),
      };
      form.setFieldsValue(homeAddress);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Link href="/internalDashboard/Customers/manageCustomers" className="text-blue-500">
          ← Back to Customers
        </Link>
        <h2 className="text-xl font-semibold">Add Customer</h2>
      </div>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="bg-white p-6 rounded-lg shadow"
        initialValues={{
          firstName: "Angel",
          lastName: "Marquez-Cabrera", 
          email: "angelmarquez370@gmail.com",
          country: "United States",
          gender: "Not Specified",
          mobilePhone: "(408) 401-4783",
          preferredContact: "Email",
          referralHistory: "None",
          login: "angelmarquez370@gmail.com",
        }}
      >
        {/* Personal Information */}
        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "First name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Last name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter a valid email" }
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Form.Item label="Country" name="country">
            <Select defaultValue="United States">
              <Select.Option value="United States">United States</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Select defaultValue="Not Specified">
              <Select.Option value="Not Specified">Not Specified</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Occupation" name="occupation">
            <Input />
          </Form.Item>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Form.Item label="Mobile Phone" name="mobilePhone">
            <Input />
          </Form.Item>
          <Form.Item label="Home Phone" name="homePhone">
            <Input placeholder="(XXX) XXX - XXXX" />
          </Form.Item>
          <Form.Item label="Work Phone" name="workPhone">
            <Input placeholder="(XXX) XXX - XXXX" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600">Birthday</label>
            <div className="flex gap-2">
              <Form.Item name="birthdayMonth" noStyle>
                <Select placeholder="MM" style={{ width: 70 }}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <Select.Option key={month} value={month}>{month}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="birthdayDay" noStyle>
                <Select placeholder="DD" style={{ width: 70 }}>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <Select.Option key={day} value={day}>{day}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="birthdayYear" noStyle>
                <Select placeholder="YYYY" style={{ width: 90 }}>
                  {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <Select.Option key={year} value={year}>{year}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Anniversary Date</label>
            <div className="flex gap-2">
              <Form.Item name="anniversaryMonth" noStyle>
                <Select placeholder="MM" style={{ width: 70 }}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <Select.Option key={month} value={month}>{month}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="anniversaryDay" noStyle>
                <Select placeholder="DD" style={{ width: 70 }}>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <Select.Option key={day} value={day}>{day}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="anniversaryYear" noStyle>
                <Select placeholder="YYYY" style={{ width: 90 }}>
                  {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <Select.Option key={year} value={year}>{year}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <Form.Item label="Preferred Contact" name="preferredContact">
            <Select defaultValue="Email">
              <Select.Option value="Email">Email</Select.Option>
              <Select.Option value="Phone">Phone</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <div className="flex gap-4 mb-6">
          <Form.Item name="active" valuePropName="checked" noStyle>
            <Checkbox>Active Profile</Checkbox>
          </Form.Item>
          <Form.Item name="mailingList" valuePropName="checked" noStyle>
            <Checkbox>Mailing List</Checkbox>
          </Form.Item>
          <span className="ml-4">Email Types:</span>
          <Form.Item name="transactionalEmail" valuePropName="checked" noStyle>
            <Checkbox>Transactional</Checkbox>
          </Form.Item>
          <Form.Item name="promotionalEmail" valuePropName="checked" noStyle>
            <Checkbox>Promotional</Checkbox>
          </Form.Item>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <Form.Item label="Booking Alert" name="bookingAlert">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Check-in Alert" name="checkInAlert">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Check-out Alert" name="checkOutAlert">
            <Input.TextArea rows={4} />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Form.Item label="Referral History:" name="referralHistory">
            <Input defaultValue="None" />
          </Form.Item>
          <Form.Item label="Referred By:" name="referredBy">
            <Select />
          </Form.Item>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <Form.Item label="Name" name="emergencyName">
            <Input />
          </Form.Item>
          <Form.Item label="Relationship" name="emergencyRelationship">
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="emergencyPhone">
            <Input placeholder="(XXX) XXX - XXXX" />
          </Form.Item>
        </div>

        {/* Address Information */}
        <div className="bg-blue-500 text-white px-4 py-2 font-medium mb-4">
          ADDRESS INFORMATION
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-3 gap-4">
            <Form.Item label="Street 1" name="homeStreet1">
              <Input />
            </Form.Item>
            <Form.Item label="Street 2" name="homeStreet2">
              <Input />
            </Form.Item>
            <Form.Item label="City" name="homeCity">
              <Input />
            </Form.Item>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Form.Item label="State" name="homeState">
              <Select>
                <Select.Option value="United States">United States</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Postal Code" name="homePostalCode">
              <Input />
            </Form.Item>
            <Form.Item label="Country" name="homeCountry">
              <Select defaultValue="United States">
                <Select.Option value="United States">United States</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm">Business Address:</span>
            <Checkbox checked={sameAsHome} onChange={(e) => handleSameAsHomeChange(e.target.checked)}>
              Same as Home Address
            </Checkbox>
          </div>

          {!sameAsHome && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <Form.Item label="Street 1" name="billingStreet1">
                  <Input />
                </Form.Item>
                <Form.Item label="Street 2" name="billingStreet2">
                  <Input />
                </Form.Item>
                <Form.Item label="City" name="billingCity">
                  <Input />
                </Form.Item>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Form.Item label="State" name="billingState">
                  <Select>
                    <Select.Option value="United States">United States</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Postal Code" name="billingPostalCode">
                  <Input />
                </Form.Item>
                <Form.Item label="Country" name="billingCountry">
                  <Select defaultValue="United States">
                    <Select.Option value="United States">United States</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </>
          )}
        </div>

        {/* Preferences */}
        <div className="bg-blue-500 text-white px-4 py-2 font-medium mb-4">
          PREFERENCES
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Form.Item label="Preferred Staff Gender:" name="preferredStaffGender">
            <Select defaultValue="No Preference">
              <Select.Option value="No Preference">No Preference</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Preferred Staff Member:" name="preferredStaffMember">
            <Select defaultValue="No Preference">
              <Select.Option value="No Preference">No Preference</Select.Option>
            </Select>
          </Form.Item>
        </div>

        {/* Account Login */}
        <div className="bg-blue-500 text-white px-4 py-2 font-medium mb-4">
          ACCOUNT LOGIN
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Login:" name="email">
              <Input disabled className="bg-gray-100" />
            </Form.Item>
            <Form.Item label="Login Alert:" name="loginAlert">
              <Input />
            </Form.Item>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Password:</span>
            <button type="button" className="text-blue-500 hover:underline">Change</button>
            <span className="text-sm text-gray-500 ml-4">Appears in Customer on Login</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button style={{width: "80px"}} size="large">Back</Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading} 
            className="bg-blue-900"
            style={{width: "80px"}} 
            size="large"
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default MiddleSection;